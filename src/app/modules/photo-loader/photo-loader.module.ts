import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoLoaderDirective } from './photo-loader.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [PhotoLoaderDirective],
  exports: [PhotoLoaderDirective],
})
export class PhotoLoaderModule { }
