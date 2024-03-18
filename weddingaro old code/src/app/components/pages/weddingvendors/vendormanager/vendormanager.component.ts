import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendormanager',
  templateUrl: './vendormanager.component.html',
  styleUrls: ['./vendormanager.component.scss']
})
export class VendormanagerComponent {

  
  selectedButton: string = 'option1'; // Default selection
  totalstores: any;

  constructor(private userService: UserService, private vendorService: VendorService ,private router: Router) {

  }
  
  selectButton(buttonId: string) {
    this.selectedButton = buttonId;
  }

  items: any[] = [];
  
  ngOnInit(): void {
    // Fetch filter categories from the service
    this.getFavVendor();
    this.totalfavstores();
  } 
  totalfavstores() {
    this.userService.getAllVendor().subscribe((response: any) => {

     
      // this.items = Object.values(response.favariteStore).filter((item: any) => item.favoriteStore > 0);
      this.totalstores = response.totalfavariteStore;
    });
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
