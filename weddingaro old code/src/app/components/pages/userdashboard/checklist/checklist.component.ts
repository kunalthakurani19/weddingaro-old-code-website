import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent {


  filterandcount: any[] = [];
  status: any[] = [];
  inboxitem: any[] = [];
  category: any[] = [];

  selectedDateFilters: any[] = [];
  selectedCategoryFilters: any[] = [];
  selectedStatusFilters: any[] = [];


  constructor(private userservice: UserService, private cdr: ChangeDetectorRef, private toastrService: ToastrService) {

  }

  ngOnInit() {
    this.getFilterAndCount();
  }

  getFilterAndCount() {
    this.userservice.getFilterCountKeywords().subscribe((response: any) => {
      if (response.success) {
        this.status = [
          { title: 'Completed', value: 'completed', color: 'green', route: 'completed', count: response.filters.completed },
          { title: 'Not Completed', value: 'notcompleted', color: 'red', route: 'notcompleted', count: response.filters.notcompleted },
          { title: 'Total Task', value: '', color: 'red', route: 'notcompleted', count: response.filters.totalTask }
        ];   // Assign the tasks from the response to the array
        this.inboxitem = [

          { title: 'Form 10 to 12 months', count: response.filters.month1012, color: 'rgba(243, 53, 53, 0.12)' },
          { title: 'Form 7 to 9 months', count: response.filters.month79, color: 'rgba(243, 53, 53, 0.24)', route: 'replied' },
          { title: 'Form 4 to 6 months', count: response.filters.month46, color: 'rgba(243, 53, 53, 0.36)', route: 'replied' },
          { title: 'Form 2 to 3 months', count: response.filters.month23, color: 'rgba(243, 53, 53, 0.48)', route: 'replied' },
          { title: 'The Last Month', count: response.filters.monthlast, color: 'rgba(243, 53, 53, 0.6)', route: 'replied' },
          { title: '2 week', count: response.filters.twoweek, color: 'rgba(243, 53, 53, 0.72)', route: 'replied' },
          { title: 'Last day', count: response.filters.lastweek, color: 'rgba(243, 53, 53, 0.84)', route: 'replied' },
          { title: 'After the wedding', count: response.filters.afterwedding, color: 'rgba(243, 53, 53, 1)', route: 'replied' },
          { title: 'Wedding day', count: response.filters.weddingday, color: 'rgba(243, 53, 53, 1)', route: 'replied' },


        ];
        this.category = Object.values(response?.filters?.category).filter((category: any) => category?.count > 0);
        this.selectedDateFilters = [];
        this.selectedCategoryFilters = [];
      }
    });
  }


  addDate(date: string) {
    if (!this.selectedDates.includes(date)) {
      this.selectedDates.push(date);
      this.updateFilters();
    }
  }

  removeDate(date: string) {
    this.selectedDates = this.selectedDates.filter(
      (selectedDate) => selectedDate !== date
    );
    this.updateFilters();
  }

  addCategory(id: string, name: string) {
    if (!this.selectedCategories.some(category => category.id === id)) {
      this.selectedCategories.push({ id, name });
      this.updateFilters();
    }
  }

  removeCategory(category: any) {
    this.selectedCategories = this.selectedCategories.filter(selectedCategory => selectedCategory.id !== category.id);
    this.updateFilters();
  }

  private updateFilters() {
    this.userservice.updateSelectedDates(this.selectedDates);
    this.userservice.updateSelectedCategories(this.selectedCategories.map(category => category.id));
  }


  selectedDates: string[] = [];
  selectedCategories: any[] = [];


}
