import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filtercontent',
  templateUrl: './filtercontent.component.html',
  styleUrls: ['./filtercontent.component.scss']
})
export class FiltercontentComponent {
  constructor(private userservice: UserService, private cdr: ChangeDetectorRef ) {
   
  }
  tableData = [
    { type: 'hello', perPlate: 'Mark', capacity: 'Otto' },
    { type: 'hello', perPlate: 'Jacob', capacity: 'Thornton' }
  ];
  venuesList = [
   
  ];

  showModal = false;
  openModal() {
    this.showModal = true;
    this.cdr.detectChanges();
  }
  closeModal() {
    this.showModal = false;
  }
}
