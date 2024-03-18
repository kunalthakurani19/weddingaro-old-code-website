import { Component } from '@angular/core';

@Component({
  selector: 'app-userinbox',
  templateUrl: './userinbox.component.html',
  styleUrls: ['./userinbox.component.scss']
})
export class UserinboxComponent {

  status = [
    { title: 'Vendor messages', count: 2, color: '#F3B640', route: 'replied' },
    { title: 'Private messages', count: 2, color: '#F3B640', route: 'replied' },
    { title: 'Notifications', count: 2, color: '#F3B640', route: 'replied' },
    { title: 'Admin messages', count: 2, color: '#F3B640', route: 'replied' },
  ];
  data: any = [
    { name: 'Arun', img: '/assets/images/profile2.png',  status: "pending" ,  color: "#F3B640"   },
    { name: 'Manoj Suneja', img: '/assets/images/profile1.png',  status: "Replied" , color: "#3FB2F2"  },
    { name: 'Deeksha Sharma', img: '/assets/images/profile2.png',  status: "Booked" , color: "" },
    { name: 'Hasan', img: '/assets/images/profile1.png',  status: "Discarded", color: ""  },
  ];

}
