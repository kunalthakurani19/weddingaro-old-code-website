import { Component, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/common-components/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-inbox-content',
  templateUrl: './inbox-content.component.html',
  styleUrls: ['./inbox-content.component.scss']
})
export class InboxContentComponent {


  constructor(private userService: UserService, private toastrService: ToastrService, private dialog: MatDialog) {

  }
  inboxItems = [
    { title: 'Inbox', count: 369 },
    { title: 'Unread', count: 2 },
    { title: 'Read', count: 367 },
    { title: 'Archived', count: 0 },
  ];

  status = [
    { title: 'Pending', count: 369, color: '#F3B640' },
    { title: 'Replied', count: 2, color: '#3EAFED' },
    { title: 'Booked', count: 367, color: '#57ED3E' },
    { title: 'Discarded', count: 0, color: '#ED3E5E' },
  ];

  chart: any;

  cards: any = [
    { title: 'Replied', icon: '/assets/images/replied.svg' },
    { title: 'Booked', icon: '/assets/images/check.svg' },
    { title: 'Discarded', icon: '/assets/images/discarded.svg' },
    { title: 'Your response time is SLOW', icon: '/assets/images/time.svg' },
  ];

  data: any = [
    { name: 'Arun', img: '/assets/images/profile2.png', status: "pending", color: "#F3B640" },
    { name: 'Manoj Suneja', img: '/assets/images/profile1.png', status: "Replied", color: "#3FB2F2" },
    { name: 'Deeksha Sharma', img: '/assets/images/profile2.png', status: "Booked", color: "" },
    { name: 'Hasan', img: '/assets/images/profile1.png', status: "Discarded", color: "" },
  ];

  activeSection = 'inbox';
  @Output() allrequest: any[] = [];
  
  setActiveSection(section: string): void {
    this.activeSection = section;
  }
  isChecked: boolean = false;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }
  masterCheckbox: boolean = false;

  getAllRequest() {
    this.userService.getAllRequest().subscribe((response: any) => {
      if (response.success) {
        this.allrequest = response?.requests;        
        // return response.task.id; // Assign the tasks from the response to the array
      }
    });
  }

  confirmDelete(taskId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { message: 'Are you sure you want to delete?' }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            // If the user clicks "Yes" in the confirmation dialog
            this.deleteTask(taskId);
        }
    });
}

  ngOnInit() {
    this.getAllRequest();
  }

  deleteTask(taskId: string) {
    this.userService.deleteRequest(taskId).subscribe(
      (response: any) => {
        if (response.success) {
          // Remove the deleted task from the 'alltask' array
          // this.allrequest = this.allrequest.filter((item) => item._id !== taskId);
          this.toastrService.success(response.message);
          this.getAllRequest();
        
        } else {
          // Handle error if needed
          this.toastrService.error(response.message);
        }
      },
      (error) => {
        // Handle errors here
        this.toastrService.error(error.message);
        console.error('Error deleting task:', error.message);
      }
    );
  }
}
