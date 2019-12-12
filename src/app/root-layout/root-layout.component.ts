import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SharedModule } from '../modules/shared/shared.module';
import { UIStateService } from '../services/ui-state.service';

@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.css']
})
export class RootLayoutComponent implements OnInit {

  @Input() showNavigation: boolean

  constructor(
    readonly authService: AuthService,
    readonly uiState: UIStateService
  ) { }

  ngOnInit() {
    this.showNavigation = this.uiState.showNavigation
  }

}
