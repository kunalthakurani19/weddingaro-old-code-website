import { Component } from '@angular/core';

@Component({
  selector: 'app-mywedding',
  templateUrl: './mywedding.component.html',
  styleUrls: ['./mywedding.component.scss']
})
export class MyweddingComponent {
  
  // private calculateTimeRemaining() {
  //   const now = new Date().getTime();
  //   const difference = this.endDate.getTime() - now;

  //   if (difference <= 0) {
  //     this.countdown = {
  //       days: 0,
  //       hours: 0,
  //       minutes: 0,
  //       seconds: 0
  //     };
  //   } else {
  //     this.countdown = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //       minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
  //       seconds: Math.floor((difference % (1000 * 60)) / 1000)
  //     };
  //   }
  // }

}
