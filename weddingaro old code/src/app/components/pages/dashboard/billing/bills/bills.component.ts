import { Component } from '@angular/core';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent {
  ths = ['Due Date', 'Document', 'Amount', ''];

  pandingBills = [
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
  ];
  paidBills = [
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
  ];
}
