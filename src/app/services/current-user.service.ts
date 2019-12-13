import { Injectable } from "@angular/core";
import { IAthlete_Response_V1, IAthletePublicInfo } from "superfitjs";
import { Observable, throwError, of } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";

@Injectable()
export class CurrentUserService {

  static readonly CURRENT_USER_KEY: string = "current_user"

  currentUser?: IAthlete_Response_V1

  private loggedInUserBaseUrl(): string {
    return `${environment.superfit_workouts_base_uri}/v1/athletes/me`;
  }

  constructor(
    private apiService: ApiService
  ) {
  }

  updateCurrentUser(
    json: any
  ): Observable<IAthlete_Response_V1> {
    return this.apiService.updateEntity(json, this.loggedInUserBaseUrl())
  }

  getCurrentUser(): Observable<IAthlete_Response_V1 | undefined> {
    return this.apiService.fetchOne(this.loggedInUserBaseUrl());
  }
}