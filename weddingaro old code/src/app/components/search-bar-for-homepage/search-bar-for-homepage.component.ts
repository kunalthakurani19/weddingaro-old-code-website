import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VendorService } from 'src/app/services/vendor.service';
import { imgLink } from 'src/assets/imgLinks';
import { statesJSON, urbanJSON } from 'src/india-city-state';

@Component({
  selector: 'app-search-bar-for-homepage',
  templateUrl: './search-bar-for-homepage.component.html',
  styleUrls: ['./search-bar-for-homepage.component.scss']
})
// export class SearchBarForHomepageComponent {
//   categoryId = '';
//   sectorId = '';
//   @Input() location = '';
//   @Output() searchFilter = new EventEmitter();


//   constructor(
//     private actRoute: ActivatedRoute,
//     private vendorService: VendorService,
//     private userService: UserService
//   ) {
//     this.actRoute.queryParamMap.subscribe((params: any) => {
//       this.categoryId = params.get('category') || ''; // Use params.get() and handle null or undefined
//       this.sectorId = params.get('sector') || '';
//       this.location = params.get('location') || '';
//       this.selectedCity = '';

//       this.getSectors();
//     });

//     for (let key in urbanJSON) {
//       this.cityOptions.push(key);
//     }
//   }

//   sectorsData: any = [];
//   selectedFilter: string = ''
//   cityOptions: any = []
//   selectedVenue = '';
//   selectedCity = '';
//   showVenue = false;
//   showCity = false;


//   navbarItems: any[] = [];
//   toggleCityDropdown(): void {
//     this.showCity = true;
//   }
//   toggleVenueDropdown() {
//     this.showVenue = true;
//   }
//   blurCityDropdown(): void {
//     setTimeout(() => {
//       this.showCity = false;
//     }, 500);
//   }
//   blurVenueDropdown() {
//     setTimeout(() => {
//       this.showVenue = false;
//     }, 500);
//   }
//   selectVenue(option: any): void {
//     this.selectedFilter = option.title;
//     this.categoryId = option._id
//   }
//   selectCity(option: string): void {
//     this.selectedCity = option;
//   }

//   ngOnInit(): void {
//   }


//   // getSectors() {
//   //   this.vendorService.getSectors().subscribe((response: any) => {
//   //     this.filters['sector'] = response?.sector?.find((item:any)=> item._id==this.sectorId);
//   //     this.filters['category'] = this.filters['sector']['categorys']
//   //     this.filters['category'].push({_id: this.filters['sector']._id,name: this.filters['name']})
//   //     if(this.categoryId.length){
//   //       this.selectedFilter = this.filters.category.find((item:any)=> item._id==this.sectorId ||  item._id==this.categoryId).name
//   //     }else{
//   //       this.selectedFilter = this.filters['sector'].name
//   //     }
//   //   });
//   // }
//   search() {
//     this.userService.getAllStoresforhome(this.categoryId, this.selectedCity).subscribe(
//       (response: any) => {
//         if (response.success) {
//           const stores = response.stores;
//           this.searchFilter.emit({ location: this.selectedCity, categoryId: this.categoryId, stores: stores });
//         }
//       },
//       (error: any) => {
//         // Handle error, log or display a message
//       }
//     );
//   }


//   getSectors() {
//     this.vendorService.getSectors().subscribe((response: any) => {
//       if (response.success) {
//         // Assuming the API response structure matches the expected structure
//         this.navbarItems = response.sector.map((sector: any) => {
//           return {
//             parentTitle: sector.name,
//             // route:`${this.routerMapper[sector.name]}`,
//             queryParams: sector._id,
//             children: sector.categorys.map((category: any) => {
//               return {
//                 title: category.name,
//                 // route: `${this.routerMapper[sector.name]}?sector=${sector._id}`,
//                 queryParams: category._id // Modify the link as needed
//               };
//             }),
//           };
//         });
//       }
//     });
//   }
// }
export class SearchBarForHomepageComponent {
  categoryId = '';
  sectorId = '';
  @Input() location = '';
  @Output() searchFilter = new EventEmitter();


  constructor(
    private actRoute: ActivatedRoute,
    private vendorService: VendorService,
    private userService: UserService
  ) {
    this.actRoute.queryParamMap.subscribe((params: any) => {
      this.categoryId = params.get('category') || '';
      this.sectorId = params.get('sector') || '';
      this.location = params.get('location') || '';
      this.selectedCity = '';

      this.getSectors();
    });

    for (let key in urbanJSON) {
      this.cityOptions.push(key);
    }
  }

  sectorsData: any = [];
  selectedFilter: string = ''
  cityOptions: any = []
  selectedVenue = '';
  selectedCity: string =  '';
  showVenue = false;
  showCity = false;



  navbarItems: any[] = [];
  toggleCityDropdown(): void {
    this.showCity = true;
  }
  toggleVenueDropdown() {
    this.showVenue = true;
  }
  blurCityDropdown(): void {
    setTimeout(() => {
      this.showCity = false;
    }, 100);
  }
  blurVenueDropdown() {
    setTimeout(() => {
      this.showVenue = false;
    }, 100);
  }
  selectVenue(option: any): void {
    console.log('Selected Option:', option);
    this.selectedFilter = option.title;
    this.categoryId = option.queryParams;
    this.showVenue = false;
  }

  selectCity(option: string): void {
    this.selectedCity = option;
    this.showCity = false;
  }

  ngOnInit(): void {
  }

  clearSelection() {
    // this.selectedFilter = 'All'; // or whatever value you want for 'All'
    this.selectedCity = 'All';   // or whatever value you want for 'All'
  }

  search() {
    console.log('CategoryId:', this.categoryId);
    console.log('Selected City:', this.selectedCity);

    this.userService.getAllStoresforhome(this.categoryId, this.selectedCity).subscribe(
      (response: any) => {
        if (response.success) {
          // const stores = response.stores;
          
          let data = response?.stores;
          console.log(data)
          let vendors = data.map((store: any) => {
            const lowestMenuPrice = store?.menus ? this.getSmallestPrice(store?.menus) : 0;
            return {
              name: store?.businessdetails['businessName'],
              img: store.photos && store.photos.length ? store.photos.map((photo: any) => photo.url) : imgLink.noImageAvailble,
              rating: 4, // get rating here from somewhere in future
              address: store?.location?.city,
              lowestFood: lowestMenuPrice,
              id: store._id,
              category: store.businessdetails.category._id,
              capacity: {
                min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max

              },
            }
          })
          this.searchFilter.emit({ location: this.selectedCity, categoryId: this.categoryId, stores: vendors });
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getSmallestPrice(menus: any[]): number {
    // Map the prices to an array of numbers
    const prices = menus.map(menu => parseFloat(menu.price));
  
    // Use Math.min() to get the smallest price
    return Math.min(...prices);
  }


  getSectors() {
    this.vendorService.getSectors().subscribe((response: any) => {
      if (response.success) {
        this.navbarItems = response.sector.map((sector: any) => {
          return {
            parentTitle: sector.name,
            queryParams: sector._id,
            children: sector.categorys.map((category: any) => {
              return {
                title: category.name,
                queryParams: category._id
              };
            }),
          };
        });

        console.log('Navbar Items:', this.navbarItems);
      }
    });
  }

}