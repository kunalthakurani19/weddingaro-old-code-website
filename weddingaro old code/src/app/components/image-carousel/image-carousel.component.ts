import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  @Input() list!: string[];
  current = 0;
  show = false;
  constructor() {}
  handlePrev(): void {
    if (this.current !== 0) {
      this.current -= 1;
    }
  }
  handlenext(): void {
    // console.log(this.list);
    // console.log(this.current);
    if (this.current !== this.list.length - 1) {
      this.current += 1;
    }
    // console.log(this.current);
  }
  handleShow(): void {
    this.show = true;
  }
  handleHide(): void {
    this.show = false;
  }
  ngOnInit(): void {}
}
