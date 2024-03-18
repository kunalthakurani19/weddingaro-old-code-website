import { Component } from '@angular/core';

@Component({
  selector: 'app-review-collector',
  templateUrl: './review-collector.component.html',
  styleUrls: ['./review-collector.component.scss']
})
export class ReviewCollectorComponent {

  cards: any = [ 
    { title: '5 request send', icon: '/assets/images/reviewmessege.svg' },
    { title: '1 not replied to', icon: '/assets/images/reviewTime.svg' },
   
  ];

  selectedTabIndex: number = 0;
}
