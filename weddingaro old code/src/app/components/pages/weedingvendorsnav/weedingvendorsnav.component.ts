import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { imgLink } from 'src/assets/imgLinks';

@Component({
  selector: 'app-weedingvendorsnav',
  templateUrl: './weedingvendorsnav.component.html',
  styleUrls: ['./weedingvendorsnav.component.scss']
})
export class WeedingvendorsnavComponent {

 
  venuesByCity = [
   
  ];
  venuesList = [
   
  ];

  
  params: any = {};
  sectorId: string = ''
  categoryId: string = '';
  location = ''
  hoveredIndex: number | null = null;
  noDataAvailable: boolean = false;

  constructor(private route: ActivatedRoute, private userservice: UserService, private router: Router) {
   
  }

  searchVenues(event: any) {
    this.fetchStoresBycategoryId(event.categoryId, event.location)
  }



  fetchStoresBycategoryId(categoryId: string, location = "") {
    this.location = location;
    this.userservice.getAllStores(categoryId, this.sectorId, location).subscribe((res: any) => {
      let data = res?.stores;
      let vendors: any = data.map((store: any) => {
        return {
          name: store?.businessdetails['businessName'],
          img: store.photos && store.photos.length ? store.photos.map((photo: any) => photo.url) : imgLink.noImageAvailble,
          rating: 4, // get rating here from somewhere in future
          address: store?.location?.city,
          lowestFood: store?.faq?.platePricing,
          id: store._id,
          state: store?.location?.state,
          category: store.businessdetails.category._id,
          capacity: {
            min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max

          },
        }
      })
      if (vendors.length === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }
      this.venuesList = vendors
      let states = [...new Set(vendors.map((item: any) => item?.state))]
      let data2: any = []
      states.forEach(state => {
        data2.push({ 'city': state, venues: vendors.filter((item: any) => item?.state == state) })
      })
      data2 = data2.sort((a: any, b: any) => b.venues.length - a.venues.length)
      this.venuesByCity = data2;
    });
  }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sectorId = params.get('sectorId') || '';
      this.categoryId = params.get('categoryId') || '';

      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState) {
        this.sectorId = navigationState.sectorId || '';
        this.categoryId = navigationState.categoryId || '';
      }

      this.fetchStoresBycategoryId(this.categoryId);
      console.log("wedding vendor sect id : ", this.sectorId);
      console.log("wedding vendor cat id : ", this.categoryId);
    });
  }
}
