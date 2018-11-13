import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CurrencyFormat, DateFormat, NumberFormat, TranslatedPairs, TranslationOptions, TranslationStatus} from './types';
import {TranslateService} from '@ngx-translate/core';
import {formatCurrencyLocale, formatDateLocale, formatNumberLocale} from './format-locale';

@Component({
  selector: 'lib-i18n',
  template: `
    <div [innerHTML]="text | applyNewLine"></div>
  `,
  styles: []
})

/**
 * A component that wrap the ngx-translate library to provide localisation.
 * It can format text, date and currency according to locale.
 */
export class NgxTranslateWrapperLibComponent implements OnInit, OnChanges, TranslationStatus {
  @Input() key: string;
  @Input() value: string;
  @Input() type: string;
  @Input() format: CurrencyFormat | NumberFormat | DateFormat;
  @Input() params: any;
  text: string;
  translationParams = {};
  translatedParams = {};

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.doTranslation();
  }

  register(params: any[]) {
    this.translationParams = params;
  }

  translated(keyValue: TranslatedPairs): void {
    this.translatedParams[keyValue.key] = keyValue.value;
    if (this.canComplete()) {
      this.onCompletion(this.key, this.translatedParams);
    }
  }

  canComplete(): boolean {
    return Object.keys(this.translationParams).length
      === Object.keys(this.translatedParams).length;
  }

  onCompletion(...data: any[]) {
    this.translate.get(data[0], data[1]).subscribe(value1 => this.text = value1);
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.doTranslation();
  }

  doTranslation() {
    // single translation
    if (!this.params) {
      let returnText: string | Promise<string>;
      returnText = this.getLocaleText(this.key, this.value, this.type, this.format);
      if (typeof returnText === 'string') {
        this.text = returnText;
      } else {
        returnText.then((value: string) => this.text = value);
      }
    } else {
      this.register(Object.keys(this.params));
      Object.keys(this.params).forEach(key => {
        const value = this.params[key];
        if (!(value instanceof Object)) {
          // directly output string
          this.translated({'key': key, 'value': value});
        } else {
          // localisation for currency, number, date with options
          const valueOption = value as TranslationOptions;
          let returnText: string | Promise<string>;
          returnText = this.getLocaleText(
            null, valueOption.value, valueOption.type, valueOption.format);
          if (typeof returnText === 'string') {
            this.translated({'key': key, 'value': returnText});
          } else {
            returnText.then((currency: string) => {
              this.translated({'key': key, 'value': currency});
            });
          }
        }
      });
    }
  }

  // only this function doesn't has side effect
  getLocaleText(key?: string, value?: string, type?: string, formats?: CurrencyFormat | NumberFormat | DateFormat) {
    switch (type) {
      case 'number': {
        if (!value) {
          console.error('variable cannot be null or undefined');
          return null;
        }
        return formatNumberLocale(this.translate, value, formats as NumberFormat) as string;
      }
      case 'currency': {
        if (!value) {
          console.error('variable cannot be null or undefined');
          return null;
        }
        return formatCurrencyLocale(this.translate, value, formats as CurrencyFormat);
      }
      case 'date': {
        if (!value) {
          console.error('variable cannot be null or undefined');
          return null;
        }
        return formatDateLocale(this.translate, value, formats as DateFormat);
      }
      default: {
        return this.translate.get(this.key).toPromise<string>();
      }
    }
  }
}
