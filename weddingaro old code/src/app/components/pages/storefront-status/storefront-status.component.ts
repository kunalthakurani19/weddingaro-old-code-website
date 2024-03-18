import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-storefront-status',
  templateUrl: './storefront-status.component.html',
  styleUrls: ['./storefront-status.component.scss']
})
export class StorefrontStatusComponent {


  status: any | null;
  remaining: any | null;
  completedKeys: any[] = [];
  remainingKeys: any[] = [];
  totalKeys = [
    "businessdetails",
    "location",
    "faq",
    "photos",
    "availibility",
    "video",
    "menus",
    "events",
    "socialnetwork"
  ]


  // Add this method to your component class
  navigateToRoute(key: string): void {
    // Map remaining keys to their respective routes
    const routeMap: { [key: string]: string } = {
      'businessdetails': '/dashboard/storefront/business-details',
      'location': '/dashboard/storefront/location',
      'faq': '/dashboard/storefront/faqs',
      'photos': '/dashboard/storefront/photos',
      'availibility': '/dashboard/storefront/availability',
      'video': '/dashboard/storefront/video',
      'menus': '/dashboard/storefront/menus',
      'events': '/dashboard/storefront/events',
      'socialnetwork': '/dashboard/storefront/social-networks',
    };

    // Get the route for the given key, or a default route if not found
    const route = routeMap[key] || '/dashboard/storefront/default'; // Change 'default' to your default route

    // Navigate to the route
    this.router.navigate([route]);
  }





  chartsData = [
    { dasharray: '20,100', percentage: '1.0', color: 'grey', title: "Quality of service" },
    { dasharray: '40,100', percentage: '2.0', color: '#FFBF52', title: "Response time" },
    { dasharray: '60,100', percentage: '3.0', color: '#FF9C38', title: "Professionalism" },
    { dasharray: '80,100', percentage: '4.0', color: '#8FE031', title: "Flexibility" },
    { dasharray: '100,100', percentage: '5.0', color: '#2CC72C', title: "Value" },
    // Add more objects for additional charts if needed
  ];



  constructor(private vendorService: VendorService, private router: Router) { }

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
        const completed = res.stores[0]?.completed;
        const totalTabs = res.stores[0]?.totalTabs;
        const completedKeys = res.stores[0]?.completedKeys;


        this.status = !isNaN(rawPurcentage) && rawPurcentage !== null
          ? parseFloat(rawPurcentage.toFixed(0))
          : 0;
        this.remaining = totalTabs - completed;
        this.completedKeys = completedKeys;
        this.remainingKeys = this.totalKeys.filter(key => !this.completedKeys.includes(key));

      });
    } else {
      // Handle the case when storeId is undefined, empty, or both (not available)
      // this.status = 0; // Set status to 0 in case of undefined or empty storeId
    }
  }



  ngOnInit(): void {
    this.getstatus();
  }

}
