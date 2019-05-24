import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLandingComponent } from './root-landing.component';

describe('RootLandingComponent', () => {
  let component: RootLandingComponent;
  let fixture: ComponentFixture<RootLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
