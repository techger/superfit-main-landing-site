import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RootLandingComponent } from './root-landing/root-landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { Angulartics2Module } from 'angulartics2';
import { ApiService } from './services/api.service';
import { RemotelyComponent } from './remotely/remotely.component'
import { CurrentUserService } from './services/current-user.service';
import { RootLayoutComponent } from './root-layout/root-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SEOService } from './services/seo.service';
import { UGCTermsComponent } from './ugcterms/ugcterms.component';

@NgModule({
  declarations: [
    AppComponent,
    RootLandingComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    OurStoryComponent,
    UserProfileComponent,
    UGCTermsComponent,
    NotFoundComponent,
    RemotelyComponent,
    RootLayoutComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: "sign-in",
        component: SignInComponent
      },
      {
        path: "",
        component: RootLayoutComponent,
        children: [
          {
            path: "",
            component: RootLandingComponent,
            data: {
              title: 'SuperFit - Workout Mobile App',
              description: 'The best workout app for people who play sports.',
              ogUrl: 'https://www.superfitapp.com'
            }
          },
          {
            path: "privacy-policy",
            component: PrivacyPolicyComponent
          },
          {
            path: "terms",
            component: TermsOfServiceComponent
          },
          {
            path: "ugc-terms",
            component: UGCTermsComponent
          },
          {
            path: "workout-spreadsheet",
            component: RemotelyComponent,
            data: {
              title: 'Workout Spreadsheet',
              description: 'Create a Workout Plan & Share It. for the online personal trainer and fitness coach.',
              ogUrl: 'https://www.superfitapp.com/workout-spreadsheet'
            }
          },
          {
            path: "our-story",
            component: OurStoryComponent
          },
          {
            path: "404",
            component: NotFoundComponent
          },
          {
            path: ":username",
            component: UserProfileComponent
          },
          {
            path: '**', redirectTo: '/404'
          }
        ]
      },
    ]),
    Angulartics2Module.forRoot()
  ],
  providers: [
    ApiService,
    CurrentUserService,
    SEOService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

