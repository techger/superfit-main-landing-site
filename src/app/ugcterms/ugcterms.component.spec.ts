import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UGCTermsComponent } from './ugcterms.component';

describe('UGCTermsComponent', () => {
  let component: UGCTermsComponent;
  let fixture: ComponentFixture<UGCTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UGCTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UGCTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
