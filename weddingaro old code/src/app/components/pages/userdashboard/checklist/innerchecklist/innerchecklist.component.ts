import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ChecklistComponent } from '../checklist.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-innerchecklist',
  templateUrl: './innerchecklist.component.html',
  styleUrls: ['./innerchecklist.component.scss']
})
export class InnerchecklistComponent {

  taskForm: FormGroup;
  showModal = false;
  showSecondModal: boolean = false;
  selectedCategory: string = '';
  categories: any = [];
  alltask: any[] = [];
  totaltask!: number;
  completed!: number;
  notcompleted!: number;
  selectedTask: any;


  constructor(private userservice: UserService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private toastrService: ToastrService, private checklist: ChecklistComponent) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      startdate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCategories();
    this.gettotaltaskandnumber();
  
    // Combine both keyword and category filters
    combineLatest([this.userservice.selectedDates$, this.userservice.selectedCategories$])
    .subscribe(([dates, categories]) => {
      // Build the payload with non-empty arrays
      const filters: any = {};
      if (dates.length > 0) {
        filters.keyword = dates;
      }
      if (categories.length > 0) {
        filters.category = categories;
      }

      this.fetchFilteredTasks(filters);
    });
  
    // Initial fetch with no filters
    this.fetchFilteredTasks({});   
  }


  currentPage = 1;
  totalPages = 1;
  limit = 10;


  fetchFilteredTasks(filters: any) {
    this.userservice.filteredTasks(filters, this.currentPage, this.limit).subscribe((res: any) => {
      this.alltask = res.tasks;
      this.totalPages = res.pagination.totalpage;
    });
  }
  updatePage(pageOrAction: number | 'previous' | 'next') {
    if (typeof pageOrAction === 'number') {
      this.currentPage = pageOrAction;
    } else if (pageOrAction === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    } else if (pageOrAction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  
    this.fetchFilteredTasks({});
  }

  isPageSelected(pageNumber: number): boolean {
    return this.currentPage === pageNumber;
  }


  createTask() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      this.userservice.createTask(taskData).subscribe(
        (response: any) => {
          // Handle the success response here
          console.log('Task created successfully:', response);
          this.toastrService.success(response.message);
          this.closeModal();
          this.taskForm.reset();
          this.gettotaltaskandnumber();
          this.fetchFilteredTasks({});   


          // You can close the modal or perform other actions as needed
        },
        (error) => {
          // Handle errors here
          this.toastrService.error(error.message);
          console.error('Error creating task:', error.message);
        }
      );
    }
  }




  updateTask(taskId: string, taskData: any) {
    if (this.taskForm.valid) {
      const updatedTaskData = this.taskForm.value;

      this.userservice.updateTask(this.selectedTask._id, updatedTaskData).subscribe(
        (response: any) => {
          if (response.success) {
            // Update the selected task's details
            this.selectedTask.name = response.tasks.name;
            this.selectedTask.description = response.tasks.description;
            this.selectedTask.category = response.tasks.category;
            this.selectedTask.startdate = response.tasks.startdate;

            this.toastrService.success(response.message);
            this.closeSecondModal();
            this.taskForm.reset();
          } else {
            // Handle error if needed
            this.toastrService.error(response.message);
          }
        },
        (error) => {
          // Handle errors here
          this.toastrService.error(error.message);
          console.error('Error updating task:', error.message);
        }
      );
    }
  }



  gettotaltaskandnumber() {
    this.userservice.getFilterCountKeywords().subscribe((response: any) => {
      if (response.success) {
        this.totaltask = response.filters.totalTask;
        this.completed = response.filters.completed;
        this.notcompleted = response.filters.notcompleted;


      } else {
        // Handle error if needed
      }
    });
  }

  getCategories() {
    this.userservice.getCategory().subscribe((response: any) => {
      if (response.success) {
        this.categories = response.category;
      } else {
        // Handle error if needed
      }
    });
  }

 

  getAllTask(){
    this.userservice.getAllTask().subscribe((res:any) => {
      this.alltask = res.tasks;
    });
  }

  

  deleteTask(taskId: string) {
    this.userservice.deletetask(taskId).subscribe(
      (response: any) => {
        if (response.success) {
          // Remove the deleted task from the 'alltask' array
          this.alltask = this.alltask.filter((item) => item._id !== taskId);
          this.toastrService.success(response.message);
          this.checklist.getFilterAndCount();
          this.gettotaltaskandnumber();
          this.closeSecondModal();
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

  markTaskAsCompleted(taskId: string) {
    this.userservice.getTaskComplete(taskId).subscribe(
      (response: any) => {
        if (response.success) {
          // Update the task in your 'alltask' array as completed
          const completedTaskIndex = this.alltask.findIndex((task) => task._id === taskId);
          if (completedTaskIndex !== -1) {
            this.alltask[completedTaskIndex].isCompleted = true;
          }

          this.toastrService.success(response.message);
          this.checklist.getFilterAndCount();
          this.gettotaltaskandnumber();
          this.closeSecondModal();
        } else {
          // Handle error if needed
          this.toastrService.error(response.message);
        }
      },
      (error) => {
        // Handle errors here
        this.toastrService.error(error.message);
        console.error('Error marking task as complete:', error.message);
      }
    );
  }



  initializeFormWithTaskData(task: any) {
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      category: task.category._id, // Assuming you want to pre-select the category
      startdate: task.startdate,
    });
  }
  updateSelectedTask() {
    if (this.taskForm.valid) {
      const taskId = this.selectedTask._id;
      const taskData = this.taskForm.value;

      this.updateTask(taskId, taskData);
    }
  }


  // add new task model
  openModal() {
    this.showModal = true;
    this.cdr.detectChanges();
  }

  openSecondModal(item: any) {
    this.selectedTask = item;
    this.initializeFormWithTaskData(item); // Initialize form with task data
    this.showSecondModal = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
  }

  // edit new task model


  closeSecondModal() {
    this.showSecondModal = false;
    this.taskForm.reset();
  }

}
