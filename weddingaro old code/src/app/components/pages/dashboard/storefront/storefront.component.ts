import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit, AfterViewInit {
  constructor(){}
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    console.log('sdbasdo')
  }


}
