import {NgModule} from '@angular/core';
import {NgxTranslateWrapperLibComponent} from './ngx-translate-wrapper-lib.component';
import {ApplyNewLinePipe} from './apply-new-line.pipe';

@NgModule({
  imports: [],
  declarations: [NgxTranslateWrapperLibComponent, ApplyNewLinePipe],
  exports: [NgxTranslateWrapperLibComponent]
})
export class NgxTranslateWrapperLibModule {
}
