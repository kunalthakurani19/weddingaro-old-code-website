import { Component } from '@angular/core';


@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss'],
})
export class EnquiriesComponent {
  inboxItems = [
    { title: 'Inbox', count: 369 ,route : 'inbox', selected: true},
    { title: 'Unread', count: 2 , },
    { title: 'Read', count: 367 , },
    { title: 'Archived', count: 0 , },
  ];

  status = [
    { title: 'Pending', count: 369, color: '#F3B640' },
    { title: 'Replied', count: 2, color: '#3EAFED', route: 'replied' },
    { title: 'Booked', count: 367, color: '#57ED3E' },
    { title: 'Discarded', count: 0, color: '#ED3E5E' },
  ];

  chart: any;
  

  

  

  activeSection = 'inbox';

  setActiveSection(section: string): void {
    this.activeSection = section;
  }


 
}
