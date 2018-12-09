import {TranslateService} from '@ngx-translate/core';
import {CurrencyFormat, DateFormat, NumberFormat} from './types';

/**
 * Get date format according to locale
 * @param translate service {@link TranslateService} to pass in
 * @param value value to be localised
 * @param lang explicit language to be used
 * @param format date specific format for localised
 */
export function formatDateLocale(translate: TranslateService, value: string, lang?: string, format?: DateFormat) {
  if (!value) {
    return null;
  }

  const currentLang = lang ? lang : translate.getBrowserLang();
  if (format !== undefined) {
    return new Date(Number(value))
      .toLocaleDateString(
        currentLang, {
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
        currentLang, {
          year: 'numeric', month: 'long', day: 'numeric'
        });
  }
}

/**
 *
 * @param translate service {@link TranslateService} to pass in
 * @param value value to be localised
 * @param lang explicit language to be used
 * @param currencyFormat currency specific format for localised
 */
export function formatCurrencyLocale(translate: TranslateService, value: string, lang?: string, currencyFormat?: CurrencyFormat) {
  if (!value) {
    return null;
  }

  const currentLang = lang ? lang : translate.getBrowserLang();
  if (currencyFormat === undefined) {
    return new Promise<string>((resolve, reject) => {
      translate.get('CURRENCY').subscribe((currency: string) => {
        resolve(
          Number(value).toLocaleString(currentLang, {
            style: 'currency', currency: currency
          })
        );
      }, error => reject(error));
    });
  } else {
    return Number(value).toLocaleString(currentLang, {
      style: 'currency',
      currency: currencyFormat.currency,
      currencyDisplay: currencyFormat.currencyDisplay,
      useGrouping: currencyFormat.separators
    });
  }
}

/**
 * Remove symbol of a currency string
 * @param currency string currency that contains symbol
 */
export function removeCurrencySymbol(currency: string) {
  return currency.replace(/[^\d.-]/g, '');
}

/**
 *
 * @param translate service {@link TranslateService} to pass in
 * @param value value to be localised
 * @param lang explicit language to be used
 * @param numberFormat specific number format for localised
 */
export function formatNumberLocale(translate: TranslateService, value: string, lang?: string, numberFormat?: NumberFormat) {
  if (!value) {
    return null;
  }

  const currentLang = lang ? lang : translate.getBrowserLang();
  if (!numberFormat) {
    return Number(value).toLocaleString(currentLang);
  } else {
    return Number(value).toLocaleString(currentLang, {
      style: numberFormat.style,
      useGrouping: numberFormat.separators
    });
  }
}
