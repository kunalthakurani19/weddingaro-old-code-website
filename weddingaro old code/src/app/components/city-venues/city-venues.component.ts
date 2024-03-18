import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-venues',
  templateUrl: './city-venues.component.html',
  styleUrls: ['./city-venues.component.scss'],
})
export class CityVenuesComponent implements OnInit {
  @Input() venues: any = [];
  window = window
  constructor() {}

  ngOnInit(): void {}
}
