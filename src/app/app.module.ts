import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { Routes, RouterModule } from '@angular/router';
import { RootLandingComponent } from './root-landing/root-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutCompanyComponent,
    RootLandingComponent
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
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

