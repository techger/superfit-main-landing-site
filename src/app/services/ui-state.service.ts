import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UIStateService {
  @Input() showNavigation: boolean = true
  @Input() navConfig: NavigationConfig

  constructor() {
    this.navConfig = {
      ctaText: "Sign In",
      ctaUrl: environment.app_base_uri,
      navType: NavigationType.HomePage
    }
  }
}

export interface NavigationConfig {
  ctaText?: string
  ctaUrl?: string
  navType: NavigationType
}

export const enum NavigationType {
  HomePage = "HomePage",
  TemplateDetail = "TemplateDetail"
}