import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultNavigationComponent } from '../../default-navigation/default-navigation.component';

@NgModule({
  declarations: [
    DefaultNavigationComponent
  ],
  exports: [
    DefaultNavigationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {

}
