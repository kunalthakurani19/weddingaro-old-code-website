import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']

})
export class AdminPanelComponent {



  status = [
    { title: 'DashBoard' , route: '/adminpanel/dashboard' },
    { title: 'User' , route: '/adminpanel/user'},
    { title: 'Store', route: '/adminpanel/store' },
    { title: 'Setting' , route: '/adminpanel/setting'}
  ];
  chart: any;

  getIconForTitle(title: string): string {
    const iconMapping: { [key: string]: string } = {
      'DashBoard': 'dashboard',
      'User': 'person',
      'Store': 'store',
      'Setting': 'settings',
    };

    return iconMapping[title] || '';
  }

  




  selectedTab: string = 'DashBoard';

  showContent(tabTitle: string) {
    this.selectedTab = tabTitle;
  }





}
