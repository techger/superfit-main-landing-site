import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { Routes, RouterModule } from '@angular/router';
import { RootLandingComponent } from './root-landing/root-landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { OurStoryComponent } from './our-story/our-story.component';
<<<<<<< HEAD
import { UserProfileComponent } from './user-profile/user-profile.component'
import { NotFoundComponent } from './not-found/not-found.component'
=======
import { RemotelyComponent } from './remotely/remotely.component';

>>>>>>> create first draft of remotely
import { Angulartics2Module } from 'angulartics2';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutCompanyComponent,
    RootLandingComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    OurStoryComponent,
<<<<<<< HEAD
    UserProfileComponent,
    NotFoundComponent
=======
    RemotelyComponent
>>>>>>> create first draft of remotely
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: "",
        component: RootLandingComponent,

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
    ]),
    Angulartics2Module.forRoot()
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

