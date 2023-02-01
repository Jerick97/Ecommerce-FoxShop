import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images = [
    'https://wongfood.vtexassets.com/arquivos/BH6-REG-M-12-01-v3.jpg?v=638107898967570000',
    'https://wongfood.vtexassets.com/arquivos/BH10-REG-M-12-01-v4.jpg?v=638108039183970000',
    'https://wongfood.vtexassets.com/arquivos/BH5-REG-M-12-01.jpg?v=638097389525030000'
  ];
  currentImageIndex = 0;

  previousImage(): void {
    this.currentImageIndex = this.currentImageIndex - 1;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.images.length - 1;
    }
  }

  nextImage(): void {
    this.currentImageIndex = this.currentImageIndex + 1;
    if (this.currentImageIndex >= this.images.length) {
      this.currentImageIndex = 0;
      }
  }
}
