import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-favroitevendor',
  templateUrl: './favroitevendor.component.html',
  styleUrls: ['./favroitevendor.component.scss']
})
export class FavroitevendorComponent {
  // items: any[] = [];


  // favstores: any[] = [];
  constructor(private userService: UserService, private vendorService: VendorService , private router: Router) {

  }
  // getfavStores() {
  //   this.userService.getAllVendor().subscribe((data: any) => {
  //     // Filter the data to show only items with favoriteStore > 0
  //     this.favstores = data.category.filter((category: any) => category.favoriteStore > 0)
  //       .map((category: any) => ({
  //         imageUrl: '/assets/images/Venue.svg',
  //         text: category.name,
  //         icons: '/assets/images/Home.svg',
  //         route: 'allvendorshow'
  //       }));
  //   });
  // }

  items: any[] = [];

  ngOnInit(): void {
    // Fetch filter categories from the service
    this.getFavVendor();
  }

  getFavVendor() {
    this.userService.getAllVendor().subscribe((response: any) => {

     
      // this.items = Object.values(response.favariteStore).filter((item: any) => item.favoriteStore > 0);
      this.items = response.favariteStore;
    });
  }

  

  goToAllVendorByCategory(venueId: string){
    this.router.navigate(['/user-dashboard/wedding-vendors/allvendorshow', venueId]);
  }


}





// items = [
//   {
//     imageUrl: '/assets/images/Venue.svg',
//     text: 'Venues',
//     icons: '/assets/images/Home.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Photography and video.svg',
//     text: 'Photography and video',
//     icons: '/assets/images/SLR Camera.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Caterers.svg',
//     text: 'Caterers',
//     icons: '/assets/images/Dinner.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Wedding planners.svg',
//     text: 'Wedding planners',
//     icons: '/assets/images/Book.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Jewellery.svg',
//     text: 'Jewellery',
//     icons: '/assets/images/DiamondWhite.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Transportation.svg',
//     text: 'Transportation',
//     icons: '/assets/images/Jeep.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Wedding Cards.svg',
//     text: 'Wedding Cards',
//     icons: '/assets/images/For You.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Flowers and decoration.svg',
//     text: 'Flowers and decoration',
//     icons: '/assets/images/Flower Bouquet.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Bridal accessories.svg',
//     text: 'Bridal accessories',
//     icons: '/assets/images/Bride.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Grooms accessories.svg',
//     text: 'Grooms accessories',
//     icons: '/assets/images/Groom.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Health and beauty.svg',
//     text: 'Health and beauty',
//     icons: '/assets/images/Beautician.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Entertainment.svg',
//     text: 'Entertainment',
//     icons: '/assets/images/Theatre Mask.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Wedding gifts.svg',
//     text: 'Wedding gifts',
//     icons: '/assets/images/Gift.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Honeymoon (1).svg',
//     text: 'Honeymoon',
//     icons: '/assets/images/Wedding Travel.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Mehendi Artist.svg',
//     text: 'Mehendi Artist',
//     icons: '/assets/images/Two Hearts.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Wedding choreographers.svg',
//     text: 'Wedding choreographers',
//     icons: '/assets/images/Micro.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Cakes.svg',
//     text: 'Cakes',
//     icons: '/assets/images/Wedding Cake.svg',
//     route: 'allvendorshow'
//   },
//   {
//     imageUrl: '/assets/images/Others.svg',
//     text: 'Others',
//     icons: '/assets/images/View More.svg',
//     route: 'allvendorshow'
//   }
// ];