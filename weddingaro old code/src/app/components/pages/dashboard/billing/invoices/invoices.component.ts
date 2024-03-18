import { Component } from '@angular/core';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent {
  ths = ['Date', 'Bill No.', 'Amount', ''];
  invoices = [
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
  ];
}
