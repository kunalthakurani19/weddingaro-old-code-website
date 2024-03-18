import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vendors-city-venue',
  templateUrl: './vendors-city-venue.component.html',
  styleUrls: ['./vendors-city-venue.component.scss']
})
export class VendorsCityVenueComponent {
  @Input() venues: any = [];
  window = window
  constructor() {}

  ngOnInit(): void {}
}
