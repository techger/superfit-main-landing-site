import { Component, OnInit } from '@angular/core';
import { UIStateService, NavigationType } from '../../services/ui-state.service';
import { Observable, throwError } from 'rxjs';
import { Journey_Template_Response_V1 } from 'superfitjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import TemplateUtils from '../template-utils'

@Component({
  selector: 'app-training-plan-template',
  templateUrl: './training-plan-template.component.html',
  styleUrls: ['./training-plan-template.component.css']
})
export class TrainingPlanTemplateComponent implements OnInit {

  trainingPlanTemplate$: Observable<Journey_Template_Response_V1>
  numberOfWeeks?: number
  experienceLevel?: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uiState: UIStateService,
    private apiService: ApiService
  ) {

    let templateId = this.route.snapshot.paramMap.get("templateId");

    if (!templateId) {
      this.router.navigate(["/404"]);
      return
    }
    this.uiState.showNavigation = true
    this.uiState.navConfig = {
      ctaText: "Start Plan",
      ctaUrl: "https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126",
      navType: NavigationType.TemplateDetail
    }

    this.trainingPlanTemplate$ = this.apiService
      .fetchTrainingPlanTemplate(templateId)
      .pipe(
        tap(template => {
          this.numberOfWeeks = TemplateUtils.trainingPlanTemplateTotalWeeks(template)
          this.experienceLevel = TemplateUtils.experienceLevelText(template)
        }),
        catchError(error => {
          this.router.navigate(["/404"]);
          return throwError(error)
        }))
  }

  ngOnInit() {
  }
}
