import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { countryCode } from 'src/countryCode';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PleaseloginModalComponent } from '../common-components/common-modals/pleaselogin-modal/pleaselogin-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-venue-card',
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss'],
  
})
export class VenueCardComponent implements OnInit {
  @Input() cardInput: any = {};
  // @Input() showSuccessModalinput: boolean = false;

  images: string[] = [];
  currentImage: string = '';
  imageIndex: number = 0;
  sliderSubscription: Subscription | undefined;
  @Output() favoriteChanged = new EventEmitter<boolean>();

  taskForm: FormGroup;
  loginForm!: FormGroup;
  role: string = 'user';
  showModal = false;
  loginModal = false;
  showSuccessModal: boolean = false;
  selected: boolean = false;
  selectedChange = new EventEmitter<boolean>();
  allFavVendor = [];
  sectorName = '';
  showGuestCountField = false;
  countryCodes = countryCode;
  


  google: any;
  googleSubscription = new Subscription();


  constructor(
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private act: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private socialService: SocialAuthService,) {
    this.taskForm = this.formBuilder.group({
      storeId: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber:  [null,[Validators.required,Validators.pattern(/^[0-9]{10}$/),],],
      evendate: ['', Validators.required],
      totalguest: ['', [Validators.min(1)]] ,
      message: ['', Validators.required],
      countrycode: ['', Validators.required]
    });
    this.act.params.subscribe((res: any) => {
      this.role = res['role'] ? res['role'] : 'user';
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  onDateChange(event: any) {
    const selectedDate = event.value;
    this.taskForm.get('evendate')?.setValue(this.formatDate(selectedDate));
  }
  navigateToVenueDetails(venueId: string) {
    const url = this.router.createUrlTree(['venues-details', venueId]).toString();
    window.open(url, '_blank');
  }

  ngOnInit(): void {
    const storedFavoriteStatus = localStorage.getItem(`favorite_${this.cardInput.id}`);
    this.selected = storedFavoriteStatus === 'true';
    this.taskForm.patchValue({
      storeId: this.cardInput.id
    });
    this.googleSubscription = this.socialService.authState.subscribe((user) => {
      this.loginWithGoogle(user);
    });
    // this.getsectorname();
    this.taskForm.get('countrycode')?.setValue('+91');
    // this.fetchFavoriteStatus();

    this.images = this.cardInput.img instanceof Array ? this.cardInput.img : [this.cardInput.img];
    this.currentImage = this.images[0];
    if (this.cardInput.sectorName === 'Wedding Vendors' ||  'Wedding Venues') {
      this.showGuestCountField = true;
    }
    this.images = this.images.slice(0, 4);

  }



  // startImageSlider() {
  //   // Start sliding images on mouse enter
  //   this.sliderSubscription = interval(800).subscribe(() => {
  //     this.imageIndex = (this.imageIndex + 1) % this.images.length;
  //     this.currentImage = this.images[this.imageIndex];
  //   });
  // }

  // stopImageSlider() {
  //   // Stop sliding images on mouse leave
  //   if (this.sliderSubscription) {
  //     this.sliderSubscription.unsubscribe();
  //   }
  // }




  getsectorname(storeId: string) {
    // const storeId = this.cardInput.id;
    this.userService.getStoreById(storeId).subscribe((response: any) => {
      const sectorName = response?.store?.businessdetails?.sector?.name;

      // Check if sectorName is "Wedding Vendor" or "Wedding Venues"
      if (sectorName === 'Wedding Vendors' || sectorName === 'Wedding Venues') {
        this.showGuestCountField = true;
      }
    });
  }

  fetchFavoriteStatus() {
    if (this.authService.isLoggedIn.getValue()) {
      // Call the service method to get the user's favorite stores
      this.userService.getFavoriteStore().subscribe((response: any) => {
        if (response.success) {
          // Check if the current venue ID is in the user's favorite stores
          this.selected = response.vendor.favariteStore.some((store: any) => store.store === this.cardInput.id);
        }
      });
    }
  }



  ngOnDestroy(): void {
    // this.stopImageSlider();
    this.googleSubscription.unsubscribe();
    this.socialService?.signOut().catch((err) => {
      console.log(err);
    });
  }

  loginWithGoogle(user: any) {
    let payload = {
      email: user.email,
      socialid: user.id,
    };
    this.authService.socialLogin(payload).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        if (this.role == 'user') {
          this.router.navigateByUrl('/home');
        } else {
          this.router.navigateByUrl('/dashboard');
        }
        this.authService.isLoggedIn.next(true);
      },
      (error: any) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  


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


  // all models
  openModal() {
    this.showModal = true;
    this.cdr.detectChanges();
    // this.getsectorname(this.cardInput.id);
  }

  closeModal() {
    this.showModal = false;
  }

  openLoginModel() {
    this.loginModal = true;
    this.cdr.detectChanges();
  }

  closeLoginModel() {
    this.loginModal = false;
  }


  closeSuccessModal() {
    this.showSuccessModal = false;
  }

 

  public toggleSelected(venueId: string) {
    if (this.authService.isLoggedIn.getValue()) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
  
      // Save the favorite status to localStorage
      localStorage.setItem(`favorite_${venueId}`, this.selected.toString());
  
      // Call a function to save or remove the favorite vendor (optional)
      if (this.selected) {
        this.saveFavoriteVendor(venueId);
      } else {
        this.removeFavoriteVendor(venueId);
      }
    } else {
      this.toastrService.error('Please login');
      this.openLoginModal();
    }
  }

 
  private openLoginModal(): void {
    let dialogWidth = '350px';

    // Use breakpoints to dynamically set the dialog width
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        // For small screens, adjust the dialog width
        dialogWidth = '80%';
      }
    });

    const dialogRef = this.dialog.open(PleaseloginModalComponent, {
      width: dialogWidth,
      // Add other configuration options as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
    });
  }



  private saveFavoriteVendor(venueId: string) {
    const body = {
      category: this.cardInput.category,
      favariteStore: venueId,
    };

    this.userService.saveVendor(body).subscribe((response: any) => {
      if (response.success) {
        this.toastrService.success('Vendor added to favorites');
      } else {
        this.toastrService.error('Failed to add vendor to favorites');
      }
    });
  }

  private removeFavoriteVendor(venueId: string) {
    const body = {
      category: this.cardInput.category,
      favariteStore: venueId,
    };

    this.userService.removeVendor(body).subscribe((response: any) => {
      if (response.success) {
        this.toastrService.error('Vendor removed from favorites');
      } else {
        this.toastrService.error('Failed to remove vendor from favorites');
      }
    });
  }






  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
