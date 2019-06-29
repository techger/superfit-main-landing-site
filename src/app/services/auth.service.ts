import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import {
  Subscription,
  BehaviorSubject,
  of,
  timer,
  Observable,
} from "rxjs";

import { flatMap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import {
  ISignInDTO_V1,
  IAthlete_Response_V1
} from "superfitjs"
import * as auth0 from "auth0-js";
import { Auth0UserProfile } from 'auth0-js'
import { CurrentUserService } from "./../services/current-user.service";
const uuidv4 = require('uuid/v4');

export type Callback<T> = (error: null | Error, result: T | null) => void;

@Injectable()
export class AuthService {

  private static readonly AUTH_PROFILE_KEY: string = "auth_profile"
  private static readonly IS_ADMIN: string = "is_admin"
  private authProfile: any;

  // Create a stream of logged in status to communicate throughout app
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private isAdmin$ = new BehaviorSubject<boolean>(false);

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable()
  }

  isAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable()
  }

  // Subscribe to token expiration stream
  refreshSub: Subscription;

  auth0: auth0.WebAuth

  constructor(
    public router: Router,
    public apiService: ApiService,
    public userService: CurrentUserService,
    private zone: NgZone
  ) {

    this.auth0 = this.generateAuth0()

    // If authenticated, set local profile property,
    // admin status, and update login status subject.
    // If token is expired but user data still in localStorage, log out.
    if (this.tokenValid) {
      const authProfileLocalStore = localStorage.getItem(AuthService.AUTH_PROFILE_KEY)
      this.authProfile = JSON.parse(authProfileLocalStore);
      this.isAdmin$.next(localStorage.getItem(AuthService.IS_ADMIN) === "true");

      // Update login status subject
      this.loggedIn$.next(true);


    } else {
      localStorage.setItem("analyticsId", uuidv4());
    }
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return Date.now() < expiresAt;
  }

  // make sure redirect is registered in auth0 admin.
  public signIn(redirectUrl?: string): void {

    if (redirectUrl) {
      this.auth0 = this.generateAuth0(redirectUrl)
    }

    this.auth0.authorize();
  }

  public async handleAuthentication() {

    this.auth0.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";

        this.fetchUserInfo(authResult, (error, athlete) => {
          if (error) {
            this.router.navigate([""]);
            return
          }

          this.userService.cacheCurrentUser(athlete)

          // Redirect
          const redirectUrl: string | null = localStorage.getItem("redirectUrl");
          if (redirectUrl == null || redirectUrl === "null") {
            setTimeout(() => {
              this.router.navigate(["journey-templates"]);
            });

          } else {
            this.zone.run(() => {
              this.router.navigateByUrl(redirectUrl);
              localStorage.setItem("redirectUrl", null);
            });
          }
        });

      } else if (err) {
        this.zone.run(() => {
          this.router.navigate([""]);
          console.error(err);
        });
      }
    });
  }

  public async signOut() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem(CurrentUserService.CURRENT_USER_KEY);
    localStorage.removeItem(AuthService.AUTH_PROFILE_KEY);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  private fetchUserInfo(authResult: any, cb: Callback<IAthlete_Response_V1>) {
    const analyticsId = localStorage.getItem("analyticsId");

    const self = this;
    const auth0Client = this.auth0.client;

    let dto: ISignInDTO_V1 = {
      email: authResult.idTokenPayload.email,
      analyticsId: analyticsId
    }

    // Use access token to retrieve and set user's profile.
    auth0Client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        self.storeSession(authResult, profile);

        // In the future, we will not need to fetch profile data from Auth0.
        try {
          this.apiService.signIn(dto).subscribe(
            response => {
              cb(null, response)
            },
            error => {
              cb(error, null)
              console.log(error.message);
            });

        } catch (error) {
          console.log(error.message);
          throw error
        }
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private storeSession(authResult, profile?: Auth0UserProfile) {
    // Set tokens and expiration in localStorage.

    // Renew 3/4th time before expiration date.
    const expiresAt = JSON.stringify(((authResult.expiresIn * 3 / 4) * 1000) + Date.now());
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);

    this.loggedIn$.next(true);

    if (profile) {
      localStorage.setItem(AuthService.AUTH_PROFILE_KEY, JSON.stringify(profile));

      // Check if the user has admin role
      const roles = profile[environment.audience] || [];

      const isAdmin = roles.indexOf("admin") > -1
      localStorage.setItem(AuthService.IS_ADMIN, isAdmin.toString());
      this.isAdmin$.next(isAdmin);
    }

    // Schedule access token renewal
    this.scheduleRenewal();
  }

  private scheduleRenewal() {
    // If user isn't authenticated, do nothing
    if (!this.tokenValid) {
      return;
    }
    // Unsubscribe from previous expiration observable
    this.unscheduleRenewal();
    // Create and subscribe to expiration observable
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));

    const expiresIn$ = of(expiresAt).pipe(
      flatMap(expires => {
        const now = Date.now();
        // Use timer to track delay until expiration
        // to run the refresh at the proper time
        return timer(Math.max(1, expires - now));
      })
    );

    this.refreshSub = expiresIn$.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  private async renewToken(): Promise<void> {
    this.auth0.renewAuth(
      {
        timeout: 10000,
        usePostMessage: true
      },
      async (err, authResult) => {
        if (authResult && authResult.accessToken) {
          this.storeSession(authResult);
        } else if (err) {

          console.warn(`Could not renew token: ${err.errorDescription}`);
          // Log out without redirecting to clear auth data.
          this.signOut();

          // Log in again.
          this.signIn();
        }
      }
    );
  }

  private unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  private generateAuth0(redirectUrl: string = `${environment.base_uri}/callback`): auth0.WebAuth {
    return new auth0.WebAuth({
      clientID: environment.auth0_client_id,
      domain: environment.auth0_domain,
      responseType: "token id_token",
      audience: environment.audience,
      redirectUri: redirectUrl,
      scope: "openid profile name picture email read:templates write:templates"
    });
  }
}