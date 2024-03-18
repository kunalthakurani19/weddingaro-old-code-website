import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-collapse',
  templateUrl: './custom-collapse.component.html',
  styleUrls: ['./custom-collapse.component.scss'],
})
export class CustomCollapseComponent implements OnInit {
  @Input() faq!: {
    heading: string;
    discription: string;
  }[];
  expanded: boolean = true;
  currentCollapse: number | null = null;

  constructor() {}

  toggleCollapse(i: number): void {
    if (i === this.currentCollapse) {
      this.expanded = !this.expanded;
    } else {
      this.currentCollapse = i;
      this.expanded = true;
    }
  }

  ngOnInit(): void {}
}
