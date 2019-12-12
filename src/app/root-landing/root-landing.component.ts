import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SEOService } from '../services/seo.service';
import { UIStateService, NavigationType, NavigationTab } from '../services/ui-state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root-landing',
  templateUrl: './root-landing.component.html',
  styleUrls: ['./root-landing.component.css']
})
export class RootLandingComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seoService: SEOService,
    private uiState: UIStateService
  ) {
    this.uiState.navConfig = {
      navType: NavigationType.HomePage,
      ctaText: "Download iOS App",
      ctaUrl: "https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126",
      activeTab: NavigationTab.Workouts
    }
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    )
      .subscribe((event) => {
        this.seoService.updateTitle(event['title']);
        this.seoService.updateOgUrl(event['ogUrl']);
        //Updating Description tag dynamically with title
        this.seoService.updateDescription(event['title'] + event['description'])
      });
  }
}
