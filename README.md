# NgxTranslateWrapper
[![NPM](https://nodei.co/npm/ngx-translate-wrapper-lib.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ngx-translate-wrapper-lib/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

This is a wrapper for [@ngx-translate](https://github.com/ngx-translate/core) library, please setup and install before using it. 

- [NgxTranslateWrapper](#ngxtranslatewrapper)
  * [Examples Usage for `i18n-ngx-wrapper` component](#examples-usage-for--i18n-ngx-wrapper--component)
    + [For format number](#for-format-number)
    + [For format currency](#for-format-currency)
    + [For normal text, where `data` can be resource key from json, variable or just `string`](#for-normal-text--where--data--can-be-resource-key-from-json--variable-or-just--string-)
    + [Use in HTML tag](#use-in-html-tag)
    + [For multiple parameters](#for-multiple-parameters)
      - [with multiple formatting](#with-multiple-formatting)
    + [Other available parameters for Date, Number and Currency](#other-available-parameters-for-date--number-and-currency)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


##  Examples Usage for `i18n-ngx-wrapper` component
 When `format` is not specified, default values will be used as shown as below:
 - date: `26 October 2018` where the sequence will follow its locale
 - currency: `$120.95` where the separator will follow its locale, with 0 to 2 decimal places.
 - number: `12,300` where the separator will follow its locale, with 0 to 3 decimal places

 ### For format number
 ```html
 <i18n-ngx-wrapper [value]="numberOfPeople"
 [type]="'number'"
 [format]="{separators: false}"  ></i18n-ngx-wrapper>

 <i18n-ngx-wrapper [value]="numberOfPeople"
 [type]="'number'"  ></i18n-ngx-wrapper>
 ```
 ### For format currency
 ```html
 <i18n-ngx-wrapper [value]="balance"
 [type]="'currency'"
 [format]="{currency: 'MYR'}" ></i18n-ngx-wrapper>

 <i18n-ngx-wrapper [value]="balance"
 [type]="'currency'" ></i18n-ngx-wrapper>
 ```
 ### For normal text, where `data` can be resource key from json, variable or just `string`
 New line character and HTML tag also will be interpreted.
  
 One concern for HTML tags interpretation is it might potentially caused cross-site scripting. The approach I used to enable new line characters and HTML tags interpretation is by binding variable into innerHTML, Angular recognises the value as unsafe and automatically sanitises it, which removes any <script> tag, but remains the content of it and will render other HTML tags. Read more on [Angular security](https://angular.io/guide/security)
 
 ```html
 <i18n-ngx-wrapper [key]="'ACCOUNT_SUMMARY_TITLE'"></i18n-ngx-wrapper>
 <i18n-ngx-wrapper [key]="'hello'"></i18n-ngx-wrapper>
 ```


 ### Use in HTML tag
 ```html
 <button ion-button>
 <i18n-ngx-wrapper [key]="'ACCOUNT_SUMMARY_TITLE'"></i18n-ngx-wrapper>
 </button>
 ```
 ### For multiple parameters

 ```html
 <i18n-ngx-wrapper [key]="'EXAMPLE_MESSAGE'" [params]="{
  'name': 'John',
  'date': {value: today, type: 'date'},
  'balance': {value: balance, type: 'currency'},
  'people': {value: numberOfPeople, type: 'number'}
  }" ></i18n-ngx-wrapper>
 ```

 #### with multiple formatting

 ```html
 <i18n-ngx-wrapper [key]="'EXAMPLE_MESSAGE'" [params]="{
  'name': 'John',
  'date': {value: today, type: 'date', format:{timeZoneName: 'short'}},
  'balance': {value: balance, type: 'currency',
   format: {currency: 'MYR'} },
  'people': {value: numberOfPeople, type: 'number', format: {separators: false}}
  }" ></i18n-ngx-wrapper>
 ```

 To generate sentence like
 ```
 John has MYR 100 in this bank, which is $30.
 ```

 Assume locale is in MYR

 ```html
 <i18n-ngx-wrapper [key]="'EXAMPLE_MESSAGE'" [params]="{
'name': 'John',
'balance': {value: balance, type: 'currency'},
'balance2': {value: balance, type: 'currency', format: {currency: 'USD'} }" ></i18n-ngx-wrapper>
```

 where in the `json` file
  ```
  "EXAMPLE_MESSAGE" :
  "Hello {{name}}, it is {{date}},your current balance is {{balance}}, and there is {{people}} in the queue!",
```

### Other available parameters for Date, Number and Currency
- Other available parameters are documented in source code, [types.d.ts](https://github.com/WLun001/ngx-translate-wrapper/blob/master/projects/ngx-translate-wrapper-lib/src/lib/types.d.ts)
