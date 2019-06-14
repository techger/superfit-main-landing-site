import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { Routes, RouterModule } from '@angular/router';
import { RootLandingComponent } from './root-landing/root-landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  declarations: [
    AppComponent,
    AboutCompanyComponent,
    RootLandingComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    OurStoryComponent,
    UserProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
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
        path: "our-story",
        component: OurStoryComponent
      },

      {
        path: "404",
        component: NotFoundComponent
      },
      {
        path: ":id",
        component: UserProfileComponent
      },
    ]),
    Angulartics2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

