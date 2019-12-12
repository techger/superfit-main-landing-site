import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotelyComponent } from './remotely.component';

describe('RemotelyComponent', () => {
  let component: RemotelyComponent;
  let fixture: ComponentFixture<RemotelyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemotelyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
