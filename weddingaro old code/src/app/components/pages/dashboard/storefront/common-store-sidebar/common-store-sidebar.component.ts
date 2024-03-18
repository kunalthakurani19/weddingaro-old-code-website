import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-common-store-sidebar',
  templateUrl: './common-store-sidebar.component.html',
  styleUrls: ['./common-store-sidebar.component.scss'],
})
export class CommonStoreSidebarComponent {
  routeCard: any = [
    {
      title: 'Business details',
      route: '/dashboard/storefront/business-details',
    },
    { title: 'Location and map', route: '/dashboard/storefront/location' },
    { title: 'FAQs', route: '/dashboard/storefront/faqs' },
    { title: 'Photos', route: '/dashboard/storefront/photos' },
    { title: 'Videos', route: '/dashboard/storefront/videos' },
    { title: 'Menus', route: '/dashboard/storefront/menus' },
    { title: 'Availability', route: '/dashboard/storefront/availability' },
    { title: 'Events', route: '/dashboard/storefront/events' },
    {
      title: 'Social networks',
      route: '/dashboard/storefront/social-networks',
    },

  ];

  constructor(private vendorService: VendorService, private router: Router) { }


  storeId = localStorage.getItem('storeId') || '';
  status: any | null;



  ngOnInit(): void {
    this.getstatus();
  }

  getstatus() {
    let storeId = localStorage.getItem('storeId') || '';
    let storeToken = localStorage.getItem('storetoken') || '';

    // Handle the case where storeId is undefined or empty, use storeToken as a fallback
    if (storeId === '' && storeToken !== '') {
      storeId = storeToken;
    }

    // Check if the final storeId is not empty or undefined before making the API call
    if (storeId !== '' && storeId !== undefined) {
      this.vendorService.getStoreBystoreId(storeId).subscribe((res: any) => {
        const rawPurcentage = res.stores[0]?.purcentage;

        // Check if purcentage is a valid number, set to 0 if not
        this.status = !isNaN(rawPurcentage) && rawPurcentage !== null
          ? parseFloat(rawPurcentage.toFixed(0))
          : 0;

        console.log(this.status);
      });
    } else {
      // Handle the case when storeId is undefined, empty, or both (not available)
      this.status = 0; // Set status to 0 in case of undefined or empty storeId
    }
  }



  

}
