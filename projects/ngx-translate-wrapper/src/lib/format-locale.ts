import {TranslateService} from '@ngx-translate/core';
import {CurrencyFormat, DateFormat, NumberFormat} from './types';

/**
 * Get date format according to locale
 * @param translate {@link TranslateService} to pass in
 * @param value value to be localised
 * @param format date specific format for localised
 */
export function formatDateLocale(translate: TranslateService, value: string, format?: DateFormat) {
  if (value == null || value === '' || value !== value) { return null; }

  if (format !== undefined) {
    return new Date(Number(value))
      .toLocaleDateString(
        translate.getBrowserLang(), {
          timeZone: format.timeZone,
          hour12: format.hour12,
          weekday: format.weekday,
          year: format.year,
          era: format.era,
          month: format.month,
          day: format.month,
          hour: format.hour,
          minute: format.minute,
          second: format.second,
          timeZoneName: format.timeZoneName
        });
  } else {
    return new Date(Number(value))
      .toLocaleDateString(
        translate.getBrowserLang(), {
          year: 'numeric', month: 'long', day: 'numeric'
        });
  }
}

/**
 *
 * @param translate {@link TranslateService} to pass in
 * @param value value to be localised
 * @param currencyFormat currency specific format for localised
 */
export function formatCurrencyLocale(translate: TranslateService, value: string, currencyFormat?: CurrencyFormat) {
  if (value == null || value === '' || value !== value) { return null; }

  const lang: string = translate.getBrowserLang();
  if (currencyFormat === undefined) {
    return new Promise<string>((resolve, reject) => {
      translate.get('CURRENCY').subscribe((currency: string) => {
        resolve(
          Number(value).toLocaleString(lang, {
            style: 'currency', currency: currency
          })
        );
      }, error => reject(error));
    });
  } else {
    return Number(value).toLocaleString(lang, {
      style: 'currency',
      currency: currencyFormat.currency,
      currencyDisplay: currencyFormat.currencyDisplay,
      useGrouping: currencyFormat.separators
    });
  }
}

/**
 *
 * @param translate {@link TranslateService} to pass in
 * @param value value to be localised
 * @param numberFormat specific number format for localised
 */
export function formatNumberLocale(translate: TranslateService, value: string, numberFormat?: NumberFormat) {
  if (value == null || value === '' || value !== value) { return null; }

  const lang: string = translate.getBrowserLang();
  if (!numberFormat) {
    return Number(value).toLocaleString(lang);
  } else {
    return Number(value).toLocaleString(lang, {
      style: numberFormat.style,
      useGrouping: numberFormat.separators
    });
  }
}
