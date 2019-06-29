import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
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
import { AuthService } from './services/auth.service';
import { CurrentUserService } from './services/current-user.service';
import { RootLayoutComponent } from './root-layout/root-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutCompanyComponent,
    RootLandingComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    OurStoryComponent,
    UserProfileComponent,
    NotFoundComponent,
    RemotelyComponent,
    RootLayoutComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
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
            component: RootLandingComponent
          },
          {
            path: "company",
            component: AboutCompanyComponent
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
            path: "remotely",
            component: RemotelyComponent
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
    AuthService,
    CurrentUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

