import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-groom-city-venue',
  templateUrl: './groom-city-venue.component.html',
  styleUrls: ['./groom-city-venue.component.scss']
})
export class GroomCityVenueComponent {
  @Input() venues: any = [];
  window = window
  constructor() {}

  ngOnInit(): void {}
}
