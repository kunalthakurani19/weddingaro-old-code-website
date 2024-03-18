import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewServiceService } from 'src/app/services/reviewService/review-service.service';
import { UserService } from 'src/app/services/user.service';
import { imgLink } from 'src/assets/imgLinks';

@Component({
  selector: 'app-reviewsteps',
  templateUrl: './reviewsteps.component.html',
  styleUrls: ['./reviewsteps.component.scss']
})
export class ReviewstepsComponent {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  storeDetails: any = [];
  reviewForm!: FormGroup;
  userRating!: number;
  ratingcategory = [
    {
      category: 'Quality of service',

      value: 'qualityservice',
      rating: 0
    },
    {
      category: 'Responsiveness',
      value: 'responsiveness',
      rating: 0
    },
    {
      category: 'Professionalism',
      value: 'professionalism',
      rating: 0
    },
    {
      category: 'Value',
      value: 'value',
      rating: 0
    },
    {
      category: 'Flexibility',
      value: 'flexibility',
      rating: 0
    }
  ];

  venueId: string = "";
  imgLink = imgLink;


  constructor(private route: ActivatedRoute, private userService: UserService,
    private fb: FormBuilder,
    private reviewService: ReviewServiceService,
    private toastrService: ToastrService,
    private router: Router
  ) {

    this.reviewForm = this.fb.group({
      reviewStep: this.fb.group({
      }),
      reviewDetailsStep: this.fb.group({
        recommend: [false],
        title: ['', [Validators.required]],
        experiance: ['', [ Validators.required ]],
      }),
      spendStep: this.fb.group({
        budget: [1, [Validators.required, ]],
        totalguest: [1, [Validators.required, ]],
        //vendor is also authorised to give review.
      })
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.venueId = params['id'];
      this.getStoreDetailsbyId(this.venueId);
    });
  }





  getStoreDetailsbyId(venueId: string): void {
    this.userService.getStoreById(venueId).subscribe((response: any) => {

      this.storeDetails = response?.store;
      console.log(this.storeDetails);

    });
  }



  sendReview() {
    if (this.reviewForm.valid) {
      const formData = {
        store: this.venueId,
        ...this.reviewForm.get('reviewDetailsStep')!.value,
        ...this.reviewForm.get('spendStep')!.value,
        ...this.getRatingsFromForm()
      };
  
      this.reviewService.createReview(formData).subscribe(
        (response: any) => {
          if (response.success ) {
            this.toastrService.success('Review Submitted Successfully');
            this.router.navigate(['venues-details', this.venueId]);
          } else {
            this.toastrService.error(response.message);
          }
        },
        (error) => {
          
          if(error.error.message === 'Please provide your authentication token'){
            this.toastrService.error('Please Login');
            this.router.navigate(['login/user']);
          }

          // Handle other errors if needed
        }
      );
      
    }
  }
  


  getRatingsFromForm() {
    const ratingData: any = {};
    this.ratingcategory.forEach(item => {
      ratingData[item.value] = item.rating;
    });
    return ratingData;
  }





  isSwitchOn: boolean = false;
  messageVisible: boolean = false;


  onSwitchChange() {
    const recommendControl = this.reviewForm.get('reviewDetailsStep')?.get('recommend');
    if (recommendControl) {
      console.log('Switch state changed. New state:', recommendControl.value);
      this.messageVisible = recommendControl.value;
    }
  }



}
