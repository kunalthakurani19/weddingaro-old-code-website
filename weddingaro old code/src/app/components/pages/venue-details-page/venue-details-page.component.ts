import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { imgLink } from 'src/assets/imgLinks';
import { countryCode } from 'src/countryCode';
import { ImagePreviewDialogComponent } from '../../common-components/image-preview-dialog/image-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewServiceService } from 'src/app/services/reviewService/review-service.service';

@Component({
  selector: 'app-venue-details-page',
  templateUrl: './venue-details-page.component.html',
  styleUrls: ['./venue-details-page.component.scss'],
})
export class VenueDetailsPageComponent {


  taskForm: FormGroup;
  venueId: string = "";
  store: any = [];
  imgLink = imgLink;
  countryCodes = countryCode;


  constructor(private route: ActivatedRoute, private userService: UserService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private renderer: Renderer2, private el: ElementRef,
    private reviewService: ReviewServiceService



  ) {
    this.taskForm = this.formBuilder.group({
      storeId: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [null,[Validators.required,Validators.pattern(/^[0-9]{10}$/),],],
      evendate: ['', Validators.required],
      totalguest: ['', [Validators.required, Validators.min(1)]],
      message: ['Hello, we discovered your profile on WeddingAro and we are interested in learning more about your business. Could you provide us some additional details?', Validators.required],
      countrycode: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.venueId = params['id'];
      this.fetchBusinessName(this.venueId);
      this.taskForm.patchValue({
        storeId: this.venueId
      });
      this.getsectorname();
    });
    this.taskForm.get('countrycode')?.setValue('+91');
    this.getStoreReview(this.venueId);
  }

  fetchBusinessName(id: string): void {
    // Make an HTTP request to fetch the business name based on the ID
    this.userService.getStoreById(id).subscribe((response: any) => {
      // Check if sectorName is "Wedding Vendor" or "Wedding Venues"
      this.store = response.store;

    });
  }



  openImagePreviewDialog(imageUrl: string): void {
    const dialogRef = this.dialog.open(ImagePreviewDialogComponent, {
      data: { imageUrl },
      panelClass: 'image-preview-dialog',
      // maxHeight: '95%',
      maxWidth: '400px',
      // height: '100%'


    });
  }






  scrollToUserPhotos() {
    const element = this.el.nativeElement.querySelector('#user-photos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  showModal = false;
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  showGuestCountField = false;
  getsectorname() {
    const storeId = this.venueId;
    this.userService.getStoreById(storeId).subscribe((response: any) => {
      const sectorName = response?.store?.businessdetails?.sector?.name;

      // Check if sectorName is "Wedding Vendor" or "Wedding Venues"
      if (sectorName === 'Wedding Vendors' || sectorName === 'Wedding Venues') {
        this.showGuestCountField = true;
      }

      this.cdr.detectChanges(); // Trigger change detection
    });
  }



  showSuccessModal: boolean = false;

  createRequest() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;


      this.userService.requestPricing(formData).subscribe(
        (response: any) => {

          // this.toastrService.success(response.message);
          this.showSuccessModal = true;
          this.closeModal();
          this.taskForm.reset();

        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  navigateToVenueDetails(venueId: string) {
    this.router.navigate(['write-review', venueId]).toString();
    // window.open(url, '_blank');
  }



  reviewDetails: any = [];


  getStoreReview(venueId: string): void {
    this.reviewService.getStoreReview(venueId).subscribe((response: any) => {
      this.reviewDetails = response?.review; // Initialize as an empty array if undefined


      console.log(this.reviewDetails);
      this.calculateOverallAverage();


    });
  }

  averageOverall: number = 0;

  calculateOverallAverage(): void {
    if (this.reviewDetails && this.reviewDetails.reviews && this.reviewDetails.reviews.length > 0) {
      const totalReviews = this.reviewDetails.reviews.length;

      const sum = this.reviewDetails.reviews.reduce((acc: number, review: { qualityservice: any; responsiveness: any; professionalism: any; value: any; flexibility: any; }) => {
        return acc + ((review.qualityservice + review.responsiveness + review.professionalism + review.value + review.flexibility) / 5);
      }, 0);

      this.averageOverall = totalReviews > 0 ? sum / totalReviews : 0;
    }
  }

  

}