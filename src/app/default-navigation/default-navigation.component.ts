import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-default-navigation',
  templateUrl: './default-navigation.component.html',
  styleUrls: ['./default-navigation.component.css']
})
export class DefaultNavigationComponent implements OnInit {
  webAppLink: string
  constructor() {
    this.webAppLink = environment.app_base_uri
  }

  ngOnInit() {
  }

}
