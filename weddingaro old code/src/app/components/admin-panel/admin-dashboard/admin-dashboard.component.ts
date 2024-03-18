import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  cards: any = [
    { title: 'Total Stores', icon: '/assets/images/emailcolored.png' },
    { title: 'Total Vendors', icon: '/assets/images/startcolored.png' },
    { title: 'Total Users', icon: '/assets/images/eyecolored.png' },
    // {title:'Phone number views',icon:'/assets/images/phonecolored.png',},
  ]

  getIconForCardsTitle(title: string): string {
    const iconMapping: { [key: string]: string } = {
      'Total Stores': 'store',
      'Total Vendors': 'business',
      'Total Users': 'person',
    };

    return iconMapping[title] || '';
  }
}
