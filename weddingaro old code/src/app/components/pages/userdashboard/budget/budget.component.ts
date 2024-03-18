import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

  public chartType: ChartType = 'doughnut';
  public chartData: number[] = [30, 70]; // Example data
  public chartLabels: string[] = ['Data A', 'Data B']; // Example labels
  public chartOptions: any = {
    responsive: true,
    legend: {
      position: 'top',
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  selectedButton: string = 'Budget Planner'; // Default selection

  

  selectButton(buttonId: string) {
    this.selectedButton = buttonId;
  }
  
  category = [
    { title: 'Events', count: 369, img: '/assets/images/icons blacks/Home (1).svg', route: 'budgetcategory' },
    { title: 'Catering', count: 23, img: '/assets/images/icons blacks/Dinner (1).svg', route: 'budgetcategory' },
    { title: 'Photography and video', count: 12, img: '/assets/images/icons blacks/SLR Camera (1).svg', route: 'budgetcategory' },
    { title: 'Planning', count: 22, img: '/assets/images/icons blacks/Book (1).svg', route: 'budgetcategory' },
    { title: 'Jewellery', count: 81, img: '/assets/images/icons blacks/Diamond Ring (2).svg', route: 'budgetcategory' },
    { title: 'Transportation', count: 76, img: '/assets/images/icons blacks/Jeep (1).svg', route: 'budgetcategory' },
    { title: 'Wedding cards', count: 10, img: '/assets/images/icons blacks/For You (1).svg', route: 'budgetcategory' },
    { title: 'Flowers and Decoration', count: 10, img: '/assets/images/icons blacks/Flower Bouquet (1).svg', route: 'budgetcategory' },
    { title: 'Bridal accessories', count: 10, img: '/assets/images/icons blacks/Bride (1).svg', route: 'budgetcategory' },
    { title: "Groom's accessories", count: 10, img: '/assets/images/icons blacks/Groom (1).svg', route: 'budgetcategory' },
    { title: 'Health & Beauty', count: 10, img: '/assets/images/icons blacks/Beautician (1).svg', route: 'budgetcategory' },
    { title: 'Entertainment', count: 10, img: '/assets/images/icons blacks/Theatre Mask (1).svg', route: 'budgetcategory' },
    { title: 'Guests', count: 10, img: '/assets/images/icons blacks/Gift (1).svg', route: 'budgetcategory' },
    { title: 'Honeymoon', count: 10, img: '/assets/images/icons blacks/Wedding Travel (1).svg', route: 'budgetcategory' },
    { title: 'Ceremony', count: 10, img: '/assets/images/icons blacks/Festival.svg', route: 'budgetcategory' },
    { title: 'Other', count: 10, img: '/assets/images/icons blacks/View More (1).svg', route: 'budgetcategory' },
  ];
  
  

  
}
