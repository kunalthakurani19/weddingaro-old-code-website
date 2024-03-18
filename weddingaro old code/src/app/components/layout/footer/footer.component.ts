import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getUserLink(): string {
    // Retrieve userDetail from localStorage
    const userRole = localStorage.getItem('userRole');

    // Check if userDetail is 'vendor' or not
    if (userRole === 'vendor') {
      return '/dashboard/storefront/business-details';
    } 
    else {
      return '/login/vendor'; // or any other default link
    }
  }


}
