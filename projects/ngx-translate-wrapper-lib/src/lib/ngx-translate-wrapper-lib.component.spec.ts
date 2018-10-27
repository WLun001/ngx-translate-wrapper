import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxTranslateWrapperLibComponent} from './ngx-translate-wrapper-lib.component';

describe('NgxTranslateWrapperLibComponent', () => {
  let component: NgxTranslateWrapperLibComponent;
  let fixture: ComponentFixture<NgxTranslateWrapperLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxTranslateWrapperLibComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTranslateWrapperLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
