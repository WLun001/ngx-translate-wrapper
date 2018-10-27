import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CurrencyFormat, DateFormat, KeyValue, NumberFormat, Options, TranslationStatus} from './types';
import {TranslateService} from '@ngx-translate/core';
import {formatCurrencyLocale, formatDateLocale, formatNumberLocale} from './format-locale';

@Component({
  selector: 'i18n-ngx-wrapper',
  template: `
    {{text}}
  `,
  styles: []
})

/**
 * A component that wrap the ngx-translate library to provide localisation.
 * It can format text, date and currency according to locale.
 * ##  Examples Usage for `i18n-ngx-wrapper` component
 When `format` is not specified, default values will be used as shown as below:
 - date: `26 October 2018` where the sequence will follow its locale
 - currency: `$120.95` where the separator will follow its locale, with 0 to 2 decimal places.
 - number: `12,300` where the separator will follow its locale, with 0 to 3 decimal places

 ### For format number
 ```html
 <i18n [value]="numberOfPeople"
 [type]="'number'"
 [format]="{separators: false}"  ></i18n>

 <i18n [value]="numberOfPeople"
 [type]="'number'"  ></i18n>
 ```
 ### For format currency
 ```html
 <i18n [value]="balance"
 [type]="'currency'"
 [format]="{currency: 'MYR'}" ></i18n>

 <i18n [value]="balance"
 [type]="'currency'" ></i18n>
 ```
 ### For normal text, where `data` can be resource key from json, variable or just `string`
 ```html
 <i18n [key]="'ACCOUNT_SUMMARY_TITLE'"></i18n>
 <i18n [key]="'hello'"></i18n>
 ```


 ### Use in HTML tag
 ```html
 <button ion-button>
 <i18n [key]="'ACCOUNT_SUMMARY_TITLE'"></i18n>
 </button>
 ```
 ### For multiple parameters

 ```html
 <i18n [key]="'EXAMPLE_MESSAGE'" [params]="{
  'name': 'John',
  'date': {value: today, type: 'date'},
  'balance': {value: balance, type: 'currency'},
  'people': {value: numberOfPeople, type: 'number'}
  }" ></i18n>
 ```

 #### with multiple formatting

 ```html
 <i18n [key]="'EXAMPLE_MESSAGE'" [params]="{
  'name': 'John',
  'date': {value: today, type: 'date', format:{timeZoneName: 'short'}},
  'balance': {value: balance, type: 'currency',
   format: {currency: 'MYR'} },
  'people': {value: numberOfPeople, type: 'number', format: {separators: false}}
  }" ></i18n>
 ```

 To generate sentence like
 ```
 John has MYR 100 in this bank, which is $30.
 ```

 Assume locale is in MYR

 ```html
 <i18n [key]="'EXAMPLE_MESSAGE'" [params]="{
'name': 'John',
'balance': {value: balance, type: 'currency'},
'balance2': {value: balance, type: 'currency', format: {currency: 'USD'} }" ></i18n>
```

 where in the `json` file
  ```
  "EXAMPLE_MESSAGE" :
  "Hello {{name}}, it is {{date}},your current balance is {{balance}}, and there is {{people}} in the queue!",
```

### Other available parameters for Date, Number and Currency
- Other available parameters are documented in source code, `./types.d.ts`
 *
 */
export class NgxTranslateWrapperComponent implements OnInit, OnChanges, TranslationStatus {
  @Input('key') key: string;
  @Input('value') value: string;
  @Input('type') type: string;
  @Input('format') format: CurrencyFormat | NumberFormat | DateFormat;
  @Input('params') params: any;
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

  translated(keyValue: KeyValue): void {
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
    if (this.params === undefined) {
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
          const valueOption = value as Options;
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
        return formatNumberLocale(this.translate, value, formats as NumberFormat) as string;
      }
      case 'currency': {
        return formatCurrencyLocale(this.translate, value, formats as CurrencyFormat);
      }
      case 'date': {
        return formatDateLocale(this.translate, value, formats as DateFormat);
      }
      default: {
        return this.translate.get(this.key).toPromise();
      }
    }
  }
}
