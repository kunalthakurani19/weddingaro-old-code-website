import { Component } from '@angular/core';

@Component({
  selector: 'app-categorybudgetside',
  templateUrl: './categorybudgetside.component.html',
  styleUrls: ['./categorybudgetside.component.scss']
})
export class CategorybudgetsideComponent {
  displayedColumns = ['SNo', 'name', 'gender', 'country'];
  dataSource = [
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
    { dueDate: '08/07/2021', invoiceNumber: 'INVIND21376', amount: '12036' },
  ];

  products = [
    { id: 1, code: 'ABC123', name: 'Product 1', price: 10.99 },
    { id: 2, code: 'DEF456', name: 'Product 2', price: 20.49 },
    { id: 2, code: 'DEF456', name: 'Product 2', price: 20.49 },
    { id: 2, code: 'DEF456', name: 'Product 2', price: 20.49 },
    { id: 2, code: 'DEF456', name: 'Product 2', price: 20.49 },
    { id: 2, code: 'DEF456', name: 'Product 2', price: 20.49 },
    // Add more product data as needed
  ];

}
