import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bride-city-venues',
  templateUrl: './bride-city-venues.component.html',
  styleUrls: ['./bride-city-venues.component.scss']
})
export class BrideCityVenuesComponent {
  @Input() venues: any = [];
  window = window
  constructor() {}

  ngOnInit(): void {}
}
