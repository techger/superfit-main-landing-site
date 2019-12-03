import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanTemplateComponent } from './training-plan-template.component';

describe('TrainingPlanTemplateComponent', () => {
  let component: TrainingPlanTemplateComponent;
  let fixture: ComponentFixture<TrainingPlanTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPlanTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
