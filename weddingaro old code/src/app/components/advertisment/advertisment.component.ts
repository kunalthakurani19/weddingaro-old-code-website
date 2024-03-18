import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advertisment',
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.scss']
})
export class AdvertismentComponent {
  @Input() title = "";
  @Input() description = "" ;
  @Input() imgurl = "" ;
  @Input() btntext = "" ;
  @Input() width = '70%'  ;
  
}
