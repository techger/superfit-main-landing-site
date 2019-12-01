import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNavigationComponent } from './default-navigation.component';

describe('DefaultNavigationComponent', () => {
  let component: DefaultNavigationComponent;
  let fixture: ComponentFixture<DefaultNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
