import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SliderComponent
  ]
})
export class SharedModule { }
