import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UIStateService {
  @Input() showNavigation: boolean = true
  @Input() navConfig: NavigationConfig

  constructor() {
    this.navConfig = {
      navType: NavigationType.HomePage,
      ctaText: "Sign In",
      ctaUrl: environment.app_base_uri,
      activeTab: null
    }
  }
}

export interface NavigationConfig {
  navType: NavigationType
  ctaText?: string
  ctaUrl?: string
  activeTab?: NavigationTab
}

export const enum NavigationType {
  HomePage = "HomePage",
  TemplateDetail = "TemplateDetail"
}

export const enum NavigationTab {
  Workouts = "Workouts",
  Remote = "Remote"
}