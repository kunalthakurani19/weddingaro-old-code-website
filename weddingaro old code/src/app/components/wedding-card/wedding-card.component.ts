import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wedding-card',
  templateUrl: './wedding-card.component.html',
  styleUrls: ['./wedding-card.component.scss'],
})
export class WeddingCardComponent implements OnInit {
  @Input() weddingInput!: any;
  constructor() {}

  ngOnInit(): void {}
}
