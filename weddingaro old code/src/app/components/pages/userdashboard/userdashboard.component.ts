import { Component } from '@angular/core';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent {

  navItems: any = [
    { title: 'My Wedding', icon: '/assets/images/Diamond Ring.svg', selected: true, route: 'my-wedding' },
    {
      title: 'Checklist',
      icon: '/assets/images/testpassed.svg', selected: false, route: 'checklist'
    },
    {
      title: 'Wedding Vendors',
      icon: '/assets/images/Stall.svg', selected: false, route: 'wedding-vendors'
    },
    {
      title: 'Guests',
      icon: '/assets/images/Management.svg', selected: false, route: 'guests'
    },
    // {
    //   title: 'Budget',
    //   icon: '/assets/images/Accounting.svg', route: 'budget'
    // },
    

  ]
}
