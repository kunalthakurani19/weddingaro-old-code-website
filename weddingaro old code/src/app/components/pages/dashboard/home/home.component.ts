import { Component, OnInit } from '@angular/core';
import { Chart ,registerables} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.createChart()
  }

  chart:any;

  cards:any=[
    {title:'Leads Recieved',icon:'/assets/images/emailcolored.png'},
    {title:'Reviews',icon:'/assets/images/startcolored.png'},
    {title:'Storefront impressions',icon:'/assets/images/eyecolored.png'},
    {title:'Phone number views',icon:'/assets/images/phonecolored.png',},
  ]
  chartCards:any=[
    {title:'Storefront impressions',value:0},
    {title:'Leads received',value:0},
    {title:'Phone Number Views',value:0}
  ]

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	       datasets: [
          {
            label: "Sales",
            data: [12,32,12,43,55,33,13,76,33,12,5,54],
            backgroundColor: 'red',
            borderRadius: 10,
          }
        ]
      },
      options: {
        plugins: {
            legend: {
                display: false
            },
        }
      }
      // options: {
      //   aspectRatio:0.5
      // }

    });
  }
}
