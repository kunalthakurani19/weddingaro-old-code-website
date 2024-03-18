import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  navItems:any=[
    // {title:'Home',icon:'/assets/images/homeicon.png',selected:true,route:'home'},
    {title:'Storefront',icon:'/assets/images/shopicon.png',selected:false,route:'storefront'},
    {title:'Enquiries',icon:'/assets/images/lettericon.png',selected:false,route:'enquiries'},
    {title:'Reviews',icon:'/assets/images/staricon.png',selected:false,route:'review'},
    // {title:'Billing',icon:'/assets/images/tips.png',route:'billing'},
    // {title:'Settings',icon:'/assets/images/settingsicon.png',selected:false,route:'setting'},

  ]
  

}
