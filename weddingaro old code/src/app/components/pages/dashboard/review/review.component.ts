import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {


  status:any=[
    // {title:'Review Collector',icon:'/assets/images/reviewCollector.svg',selected:true,route:'review-collector'},
    {title:'Reviews',icon:'/assets/images/reviewIcon.svg',selected:false,route:'reviews'},
    
  ]
  
}
