import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs'; import { UserService } from 'src/app/services/user.service';
import { countryCode } from 'src/countryCode';

@Component({
  selector: 'app-vendorelements',
  templateUrl: './vendorelements.component.html',
  styleUrls: ['./vendorelements.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { noPause: true, interval: 3000 } }
  ],
  
})
export class VendorelementsComponent {
  selectedRating = 0;
  showModal = false;
  showSuccessModal: boolean = false;
  taskForm: FormGroup;
  ratingChanged = new EventEmitter<string>();
  countryCodes = countryCode;
  totalstores: any;
  openModal() {
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
  }
  ratingText = [
    'WHAT DO YOU THINK?',
    'POOR',
    'AVERAGE',
    'GOOD',
    'VERY GOOD',
    'EXCELLENT'
  ];
  showGuestCountField = false;
  rate(rating: number) {
    if (this.selectedRating === rating) {
      // Toggle off the rating if the same heart is clicked again
      this.selectedRating = 0;
      this.ratingChanged.emit(this.ratingText[0]); // Emit "WHAT DO YOU THINK?"
    } else {
      this.selectedRating = rating;
      this.ratingChanged.emit(this.ratingText[rating]);
    }
  }

  venueId: string = '';
  categoryId: string = '';
  storeDetails: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private config: NgbCarouselConfig
  ) {
    this.taskForm = this.formBuilder.group({
      storeId: [this.categoryId],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber:  [null,[Validators.required,Validators.pattern(/^[0-9]{10}$/),],],
      evendate: ['', Validators.required],
      totalguest: ['10',],
      message: ['', Validators.required],
      countrycode: ['', Validators.required]
    });

    config.showNavigationArrows = true;
    config.interval = 0;
  }
  navigateToVenueDetails(venueId: string) {
    this.router.navigate(['venues-details', venueId]);
  }

  getsectorname() {
    const storeId = this.venueId;
    this.userService.getStoreById(storeId).subscribe((response: any) => {
      const sectorName = response.store.businessdetails.sector.name;

      // Check if sectorName is "Wedding Vendor" or "Wedding Venues"
      if (sectorName === 'Wedding Vendors' || sectorName === 'Wedding Venues') {
        this.showGuestCountField = true;
      }
    });
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      // this.fetchStoresBycategoryId(params['category'] || '');
      this.venueId = params.get('venueId') || '';
    });

    this.taskForm.patchValue({
      storeId: this.venueId
    });
    this.taskForm.get('countrycode')?.setValue('+91');
    this.getsectorname();
    this.totalfavstores();
    this.getallfavstore();

  }

  getallfavstore() {
    this.userService.filterVendorByCategory(this.venueId).subscribe((response: any) => {
      this.storeDetails = response.vendor.favariteStore;
      this.categoryId = response.vendor.favariteStore.category._id;
    });
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

  totalfavstores() {
    this.userService.getAllVendor().subscribe((response: any) => {


      // this.items = Object.values(response.favariteStore).filter((item: any) => item.favoriteStore > 0);
      this.totalstores = response.totalfavariteStore;
    });
  }

  public removeFavoriteVendor(venueId: string, categoryId: string) {
    const body = {
      category: categoryId,
      favariteStore: venueId,
    };

    this.userService.removeVendor(body).subscribe((response: any) => {
      if (response.success) {
        this.toastrService.success('Vendor removed from favorites');
        this.getallfavstore();
        this.totalfavstores();
        // this.cdr.detectChanges();
      } else {
        this.toastrService.error('Failed to remove vendor from favorites');
      }
    });
  }



}
// filterVendorByCategory




// this.userService.filterVendorByCategory(this.venueId).subscribe((response: any) => {

//   // this.storeDetails = response?.vendor.favariteStore.store;
//   let data = response?.stores;
//   let vendors: any = data.map((store: any) => {
//     return {
//       name: store?.businessdetails['businessName'],
//       img: store.photos && store.photos.length ? store?.photos[0]?.url : 'assets/images/no-data.png',
//       rating: 4, // get rating here from somewhere in future
//       address: store?.location?.city,
//       lowestFood: store?.faq?.platePricing,
//       id: store._id,
//       state: store?.location?.state,
//       category: store.businessdetails.category._id,
//       capacity: {
//         min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max
//       },
//     }
//   })
//   if (vendors.length === 0) {
//     this.noDataAvailable = true;
//   } else {
//     this.noDataAvailable = false;
//   }
//   this.storeDetails = vendors
//   // this.items = Object.values(response.favariteStore).filter((item: any) => item.favoriteStore > 0);
// });
// this.userService.filterVendorByCategory(this.venueId).pipe(
//   map((response: any) => response.vendor.favariteStore)
// ).subscribe((stores: any[]) => {
//   // Transform the data using map
//   // this.venueCards = stores.map((store) => ({
//   //   name: store.store.businessdetails.businessName,
//   //   description: store.store.businessdetails.description,
//   //   // Add more properties as needed
//   // }));
// });
// this.userService
//   .filterVendorByCategory(this.venueId)
//   .pipe(
//     map((response: any) => response.vendor.favariteStore)
//   )
//   .subscribe((stores: any[]) => {
//     // Clear the existing data in the venueCards array
//     this.venueCards = [];

//     // Push each store's data into the venueCards array
//     stores.forEach((store) => {
//       this.venueCards.push({
//         name: store?.store?.businessdetails['businessName'],
//         img: store?.store.photos && store.photos.length ? store?.photos[0]?.url : 'assets/images/no-data.png',
//         rating: 4, // get rating here from somewhere in future
//         address: store?.store?.location?.city,
//         lowestFood: store?.store?.faq?.platePricing,
//         id: store?.store._id,
//         state: store?.store?.location?.state,
//         category: store?.store.businessdetails.category._id,
//         capacity: {
//           min: store?.store?.faq?.guestAccomodation.min, max: store?.store?.faq?.guestAccomodation.max
//         },
//       });
//     });
//   });



// getAllFavStore(venueId: string){

// }

// ngOnInit() {
//   // Get the store ID from the route parameter
//   this.route.paramMap.subscribe((params) => {
//     this.storeId = params.get('storeId');
//     // Fetch store details based on the store ID from the API
//     this.userService.filterVendorByCategory(this.storeId).subscribe((response: any) => {
//       this.storeDetails = response.vendor.favariteStore.find(
//         (store) => store.store._id === this.storeId
//       );
//     });
//   });
// }
