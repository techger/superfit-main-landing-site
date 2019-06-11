import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteliComponent } from './remoteli.component';

describe('RemoteliComponent', () => {
  let component: RemoteliComponent;
  let fixture: ComponentFixture<RemoteliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
