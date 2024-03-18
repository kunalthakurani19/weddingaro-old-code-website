import { Component, Input, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss'],
})
export class CustomSliderComponent implements OnInit {
  @Input() g!: number;
  hoveredIndex: number | null = null;
 @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateStyles();
  }
  nextClickHandler(el: HTMLDivElement): void {
    const elm = el.parentElement?.children[1].children[0] as HTMLDivElement;
    const cWR = el.parentElement?.children[1] as HTMLDivElement;

    const scrollWidth = elm.scrollWidth;
    const scrollLeft = cWR.scrollLeft;

    const newScrollLeft = scrollLeft + this.g + scrollWidth;
    cWR.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }

 
  prevClickHandler(el: HTMLDivElement): void {
    const elm = el.parentElement?.children[1].children[0] as HTMLDivElement;
    const cWR = el.parentElement?.children[1] as HTMLDivElement;

    const scrollWidth = elm.scrollWidth;
    const scrollLeft = cWR.scrollLeft;

    const newScrollLeft = scrollLeft - this.g - scrollWidth;
    cWR.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  isMobile(): boolean {
    return window.innerWidth < 768; // You can adjust the breakpoint as needed
  }
  

  ngOnInit(): void {
    this.updateStyles(); // Initial styles update
  }

  private updateStyles(): void {
    const isMobile = this.isMobile();

    if (isMobile) {
      // Remove styles for mobile
      this.renderer.removeClass(this.el.nativeElement, 'main-container-mobile');
    } else {
      // Add styles for non-mobile
      this.renderer.addClass(this.el.nativeElement, 'main-container-mobile');
    }
  }
}
