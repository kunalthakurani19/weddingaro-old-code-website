import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';
import { statesJSON, urbanJSON } from 'src/india-city-state';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  categoryId = '';
  sectorId = '';
  @Input() location = ''
  @Output() searchFilter = new EventEmitter();
  constructor(private vendorService: VendorService,private route: ActivatedRoute,private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.sectorId = params.get('sectorId') || '';
      this.categoryId = params.get('categoryId') || '';

      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState) {
        this.sectorId = navigationState.sectorId || '';
        this.categoryId = navigationState.categoryId || '';
      }

      this.getSectors()
      this.location = '';
      this.selectedCity = ''
      console.log("bride sect id : ", this.sectorId);
      console.log("bride cat id : ", this.categoryId);
    });
    for (let key in urbanJSON)
      this.cityOptions.push(key);
  }
  sectorsData: any = [];
  selectedFilter: string = ''
  cityOptions: any = []
  selectedVenue = '';
  selectedCity = '';
  showVenue = false;
  showCity = false;
  filters: any = {
    sector: '',
    category: ''
  }
  toggleCityDropdown(): void {
    this.showCity = true;
  }
  toggleVenueDropdown() {
    this.showVenue = true;
  }
  blurCityDropdown(): void {
    setTimeout(() => {
      this.showCity = false;
    }, 200);
  }
  blurVenueDropdown() {
    setTimeout(() => {
      this.showVenue = false;
    }, 200);
  }
  selectVenue(option: any): void {
    this.selectedFilter = option.name;
    this.categoryId = option._id
  }
  selectCity(option: string): void {
    this.selectedCity = option;
  }

  ngOnInit(): void {
  }


  getSectors() {
    this.vendorService.getSectors().subscribe((response: any) => {
      this.filters['sector'] = response?.sector?.find((item: any) => item._id == this.sectorId);
      this.filters['category'] = this.filters['sector']['categorys']
      this.filters['category'].push({ _id: this.filters['sector']._id, name: this.filters['name'] })
      if (this.categoryId.length) {
        this.selectedFilter = this.filters.category.find((item: any) => item._id == this.sectorId || item._id == this.categoryId).name
      } else {
        this.selectedFilter = this.filters['sector'].name
      }
    });
  }
  search() {
    this.searchFilter.emit({ location: this.selectedCity, categoryId: this.categoryId, sector: this.sectorId })
  }


}
