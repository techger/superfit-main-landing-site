import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../services/api.service';
import { Phase_Response_V1, Journey_Template_Response_V1, Level, IAthletePublicInfo, IProPublicInfo } from 'superfitjs';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userPublicProfile$: Observable<IAthletePublicInfo>
  professionalProfile$: Observable<IProPublicInfo>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly apiService: ApiService) {

    const username = this.route.snapshot.paramMap.get("username");
    console.log('here');

    this.userPublicProfile$ = this.apiService
      .fetchUserPublicInfo(username)
      .pipe(
        tap(x => {
          console.log(x);
        }),
        catchError(error => {
          console.log('error');
          this.router.navigate(["/404"]);
          return throwError(error)
        }))

    this.professionalProfile$ = this.userPublicProfile$.pipe(map(athleteProfile => athleteProfile.proProfile))
  }

  ngOnInit() {
  }

  sortedPhasesByOrder(phases: Phase_Response_V1[]): Phase_Response_V1[] {
    return phases.sort((a, b) => a.order - b.order);
  }

  phaseTitle(phase: Phase_Response_V1): string {
    if (phase.title) {
      return phase.title
    }

    return `Phase ${phase.order + 1}`
  }

  // first sentence
  phaseShortDescription(phase: Phase_Response_V1): string {
    let firstSentence = phase.fullDescription.split(".")[0]

    if (firstSentence) {
      return `${firstSentence}.`
    }

    return ""
  }

  experienceLevelText(journey: Journey_Template_Response_V1): string {
    switch (journey.level.toLowerCase()) {
      case Level.Beginner:
        return "Perfect for all fitness levels"
      case Level.Intermediate:
        return "Some training experience preferred"
      case Level.Advanced:
        return "Advanced fitness experience preferred"
      case Level.Pro:
        return "Advanced movement and strength experience required"
      default:
        return "Some training experience preferred"
    }
  }
}
