import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {

  }
  title = 'superfit-landing-website';

  navigate(route: string) {
    console.log('navigatin');

    this.router.navigate([route]);
  }
}
