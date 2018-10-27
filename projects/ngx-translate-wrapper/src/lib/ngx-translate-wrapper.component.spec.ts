import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTranslateWrapperComponent } from './ngx-translate-wrapper.component';

describe('NgxTranslateWrapperComponent', () => {
  let component: NgxTranslateWrapperComponent;
  let fixture: ComponentFixture<NgxTranslateWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTranslateWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTranslateWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
