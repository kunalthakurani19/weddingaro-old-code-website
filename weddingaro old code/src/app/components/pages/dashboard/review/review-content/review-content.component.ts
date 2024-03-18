import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewServiceService } from 'src/app/services/reviewService/review-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-review-content',
  templateUrl: './review-content.component.html',
  styleUrls: ['./review-content.component.scss']
})
export class ReviewContentComponent {
  stars: any[] = [1, 2, 3, 4, 5];
  chartsData = [
    { dasharray: '', percentage: '1.0', color: 'grey', title: "Quality of service" },
    { dasharray: '40,100', percentage: '2.0', color: '#FFBF52', title: "Response time" },
    { dasharray: '60,100', percentage: '3.0', color: '#FF9C38', title: "Professionalism" },
    { dasharray: '80,100', percentage: '4.0', color: '#8FE031', title: "Flexibility" },
    { dasharray: '100,100', percentage: '5.0', color: '#2CC72C', title: "Value" },
    // Add more objects for additional charts if needed
  ];
  ratings = [
    { title: "Quality of service", percentage: 1 },
    { title: "Response time", percentage: 2 },
    { title: "Professionalism", percentage: 3 },
    { title: "Flexibility", percentage: 4 },
    { title: "Value", percentage: 5 },
  ];

  barColors = [
    'grey',
    '#FFBF52',
    '#FF9C38',
    '#8FE031',
    '#2CC72C',
  ];

  getBarStyle(backgroundColor: string, opacity: number) {
    return {
      'background-color': backgroundColor,
      opacity: opacity
    };
  }

  getBarsArray(percentage: number): { color: string; opacity: number }[] {
    const barsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < percentage) {
        barsArray.push({ color: this.barColors[percentage - 1], opacity: 1.0 });
      } else {
        barsArray.push({ color: this.barColors[percentage - 1], opacity: 0.2 });
      }
    }
    return barsArray;
  }


  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private renderer: Renderer2, private el: ElementRef, private reviewService: ReviewServiceService) { }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   this.venueId = params['id'];
    //   this.getStoreDetailsbyId(this.venueId);
    // });
    // this.getStoreReview(this.venueId);
    this.getStoreDetailsbyId();


  }

  reviewDetails: any = [];
  allReviews: any = [];
  storesWithReviews: any = [];
  averageOverallReview: number = 0;


  // getStoreDetailsbyId(): void {
  //   this.reviewService.getVendorReview().subscribe((response: any) => {
  //     this.reviewDetails = response?.review; // Initialize as an empty array if undefined
  //     this.allReviews = response?.review.reviews; // Initialize as an empty array if undefined


  //     console.log(this.reviewDetails);

  //     const totalReviews = this.allReviews.length;
  //     const sumOverworlreview = this.allReviews.reduce((acc: any, review: any) => acc + review.overworlreview, 0);
  //     const averageOverworlreview = totalReviews > 0 ? sumOverworlreview / totalReviews : 0;

  //     // Assign the average value to a property for binding in the template
  //     this.averageOverallReview = averageOverworlreview;



  //   });
  // }

  getStoreDetailsbyId(): void {
    this.reviewService.getVendorReview().subscribe((response: any) => {
      this.reviewDetails = response?.review; // Initialize as an empty array if undefined
      this.allReviews = response?.review.reviews; // Initialize as an empty array if undefined

      console.log(this.reviewDetails);


      const totalReviews = this.allReviews.length;
      const sumOverworlreview = this.allReviews.reduce((acc: any, review: any) => acc + review.overworlreview, 0);
      const averageOverworlreview = totalReviews > 0 ? sumOverworlreview / totalReviews : 0;

      this.averageOverallReview = averageOverworlreview;

      // Create a map to store reviews by store ID
      const storeReviewsMap = new Map<string, any[]>();

      // Organize reviews by store
      this.allReviews.forEach((review: any) => {
        const storeId = review.store;
        if (!storeReviewsMap.has(storeId)) {
          storeReviewsMap.set(storeId, []);
        }
        storeReviewsMap.get(storeId)?.push(review);
      });

      // Convert the map to an array for ngFor in the template
      this.storesWithReviews = Array.from(storeReviewsMap, ([storeId, reviews]) => ({
        storeId,
        reviews,
        // Calculate average overall review for each store

      }));
      console.log("stores:");
      console.log(this.storesWithReviews);
      
    });
  }








}
