import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UIStateService, NavigationConfig } from '../services/ui-state.service';

@Component({
  selector: 'app-default-navigation',
  templateUrl: './default-navigation.component.html',
  styleUrls: ['./default-navigation.component.css']
})
export class DefaultNavigationComponent implements OnInit {
  @Input() navConfig: NavigationConfig

  constructor(uiState: UIStateService) {
    this.navConfig = uiState.navConfig
  }

  ngOnInit() {
  }

}
