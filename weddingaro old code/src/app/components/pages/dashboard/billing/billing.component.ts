import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent {
  sideItems = [
    {
      title: 'Bills',
      icon: '/assets/images/billIcon.svg',
      route: 'bills',
    },
    {
      title: 'Invoices',
      icon: '/assets/images/invoiceIcon.svg',
      route: 'invoices',
    },
  ];
}
