interface TranslationStatus {
  register(params: any[]): void;

  translated(value: any): void;

  canComplete(): boolean;

  onCompletion(...data: any[]): void;
}

export interface TranslatedPairs {
  key: string;
  value: string;
}

export interface TranslationOptions {
  value: string;
  type?: 'currency' | 'number' | 'date';
  format?: CurrencyFormat | NumberFormat | DateFormat;
}

export interface CurrencyFormat {
  /**
   * currency - Example values: MYR, USD, CNY
   * Possible values are the ISO 4217 currency codes
   * Full list can be found here https://www.currency-iso.org/en/home/tables/table-a1.html
   */
  currency: string;

  /**
   * How to display the currency in currency formatting.
   * Possible values:
   * 'symbol' - localized currency symbol such as €
   * 'code - use the ISO currency code
   * 'name' - localized currency name such as "dollar"
   */
  currencyDisplay?: 'symbol' | 'code' | 'name';

  /**
   *  Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators
   *  Possible value: true, false
   */
  separators?: boolean;
}

export interface NumberFormat {
  style?: 'decimal' | 'percent';

  /**
   *  Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators
   *  Possible value: true, false
   */
  separators?: boolean;
}

export interface DateFormat {
  /**
   * The time zone to use.
   * The only value implementations must recognize is "UTC";
   * the default is the runtime's default time zone.
   * Implementations may also recognize the time zone names of the https://www.iana.org/time-zones time zone database,
   * such as "Asia/Shanghai", "Asia/Kolkata", "America/New_York".
   */
  timeZone: string;

  /**
   * Default values: true
   */
  hour12: boolean;
  weekday: 'narrow' | 'short' | 'long';
  era: 'narrow' | 'short' | 'long';
  year: 'numeric' | '2-digit';
  month: 'narrow' | 'short' | 'long' | 'numeric' | '2-digit';
  day: 'numeric' | '2-digit';
  hour: 'numeric' | '2-digit';
  minute: 'numeric' | '2-digit';
  second: 'numeric' | '2-digit';
  timeZoneName: 'short' | 'long';
}
