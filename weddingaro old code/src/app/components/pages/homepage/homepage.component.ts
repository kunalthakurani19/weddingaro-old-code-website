import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { VendorService } from 'src/app/services/vendor.service';
import { imgLink } from 'src/assets/imgLinks';

declare var bootstrap: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  //  venue examplez
  // {
  //   img: '../../../../assets/images/venue1.svg',
  //   name: 'Ramoji Film City',
  //   rating: '4.5',
  //   address: 'Vanasthalipuram, Hyderabad',
  //   lowestFood: '1800',
  //   capacity: { min: '50', max: '2000' },
  // }
  searchPerformed: boolean = false;
  @ViewChild('carousel')
  carousel!: ElementRef;
  routerMapper: any = {
    'Wedding Venues': 'wedding-venues',
    "Wedding Vendors": 'weddingvendors',
    "Brides": 'brides',
    "Grooms": 'grooms',
  }
  navbarItems: any = []

  weddingsIist = [
    {
      name: 'Suminder & Deepika',
      place: 'Gurgaon, Haryana',
      photos: [
        'https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D',

      ],
    },
    {
      name: 'Sachee & Himanshu',
      place: 'Nashik, Maharashtra',
      photos: [
        '../../../../assets/images/w1.svg',

      ],
    },
    {
      name: 'Shirin & Avinash',
      place: 'North Delhi',
      photos: [
        'https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D'

      ],
    },
    {
      name: 'Mayuri & Ajit',
      place: 'Aligarh, UP',
      photos: [
        'https://images.unsplash.com/photo-1633104502699-b2ecf0fee294?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGluZGlhbiUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D',

      ],
    },
    {
      name: 'Suminder & Deepika',
      place: 'Gurgaon, Haryana',
      photos: [
        'https://images.unsplash.com/photo-1600685912448-8bc35c141e18?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGluZGlhbiUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D',

      ],
    },
    {
      name: 'Sachee & Himanshu',
      place: 'Nashik, Maharashtra',
      photos: [
        'https://images.unsplash.com/photo-1587271449604-04bb40332709?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGluZGlhbiUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D',

      ],
    },
    {
      name: 'Shirin & Avinash',
      place: 'North Delhi',
      photos: [
        'https://images.unsplash.com/photo-1578124341183-efff2d3563dd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGluZGlhbiUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D',

      ],
    },

  ];


  weddingIdeas = [
    { title: 'Before The Wedding', imageSrc: '/assets/images/wedding-idea-1.png', route: '/comming-soon' },
    { title: 'The Wedding Ceremony', imageSrc: '/assets/images/wedding-idea-2.png', route: '/comming-soon' },
    { title: 'The Wedding Banquet', imageSrc: '/assets/images/wedding-idea-3.png', route: '/comming-soon' },
    { title: 'The Service For Your Wedding', imageSrc: '/assets/images/wedding-idea-4.png', route: '/comming-soon' },
    { title: 'Wedding Fashion', imageSrc: '/assets/images/wedding-idea-5.png', route: '/comming-soon' },
    { title: 'Health And Beauty', imageSrc: '/assets/images/wedding-idea-6.png', route: '/comming-soon' }
  ];
  landingImages = [
    { imageSrc: 'https://weddingaro.s3.ap-south-1.amazonaws.com/side-images/landing1.png' },
    { imageSrc: 'https://weddingaro.s3.ap-south-1.amazonaws.com/side-images/landing2.png' },
    { imageSrc: 'https://weddingaro.s3.ap-south-1.amazonaws.com/side-images/landing3.png' },
    { imageSrc: 'https://weddingaro.s3.ap-south-1.amazonaws.com/side-images/landing4.png' },
    { imageSrc: 'https://weddingaro.s3.ap-south-1.amazonaws.com/side-images/landing5.png' },

  ];



  constructor(private actRoute: ActivatedRoute, private authService: AuthService, private vendorService: VendorService, private router: Router, private userservice: UserService, private toastrService: ToastrService) {
    this.actRoute.params.subscribe(res => {
      if (res['token']) {
        this.authService.activateAccount(res['token']);
      }
    })
  }

  venuesList: any[] = [];
  vendorList: any[] = [];
  brideList: any[] = [];
  groomList: any[] = [];

  // getStores() {
  //   //  before putting anything in vendor list we need to make sure that we are not allowing any store in array which is currentl
  //   // under review, currently this is not happening but future this will happen,
  //   // also instead of photo will come from url in the below , currently this is not happening.

  //   this.vendorService.getAllStore().subscribe((res: any) => {
  //     let data = res?.stores;
  //     console.log(data)
  //     let vendors = data.map((store: any) => {
  //       return {
  //         name: store?.businessdetails['businessName'],
  //         img: store.photos && store.photos.length ? store?.photos[0]?.url : 'assets/images/no-data.png',
  //         rating: 4, // get rating here from somewhere in future
  //         address: store?.location?.city,
  //         lowestFood: store?.faq?.platePricing,
  //         id: store._id,
  //         category: store.businessdetails.category._id,
  //         capacity: {
  //           min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max

  //         },
  //         sectorname : store.businessdetails.sector.name
  //       }
  //     })
  //   })
  // }

  getStores() {
    this.vendorService.getAllStore().subscribe((res: any) => {
      let data = res?.stores.slice(0,40);
      // this.images = this.images.slice(0, 4);

      data.forEach((store: any) => {
        let vendor = {
          name: store?.businessdetails['businessName'],
          img: store.photos && store.photos.length ? store.photos.map((photo: any) => photo.url) : imgLink.noImageAvailble,
          rating: 4, // get rating here from somewhere in future
          address: store?.location?.city,
          formatted_address: store?.location?.formatted_address,
          lowestFood: store?.faq?.platePricing,
          id: store._id,
          category: store.businessdetails.category._id,
          capacity: {
            min: store?.faq?.guestAccomodation.min,
            max: store?.faq?.guestAccomodation.max
          },
          sectorname: store.businessdetails.sector.name
        };

        // Push the store data into the appropriate list based on sector name
        switch (store.businessdetails.sector.name) {
          case 'Brides':
            this.brideList.push(vendor);
            break;
          case 'Wedding Venues':
            this.venuesList.push(vendor);
            break;
          case 'Wedding Vendors':
            this.vendorList.push(vendor);
            break;
          case 'Grooms':
            this.groomList.push(vendor);
            break;
          // Add more cases if needed for other sector names
        }
      });
    });
  }


  getSectors() {
    this.vendorService.getSectors().subscribe((response: any) => {
      if (response.success) {
        // Assuming the API response structure matches the expected structure
        this.navbarItems = response.sector.map((sector: any) => {
          return {
            parentTitle: sector.name,
            route: `${this.routerMapper[sector.name]}`,
            queryParams: sector._id,
            children: sector.categorys.map((category: any) => {
              return {
                title: category.name,
                route: `${this.routerMapper[sector.name]}?sector=${sector._id}`,
                queryParams: category._id // Modify the link as needed
              };
            }),
          };
        });
      }
    });
  }

  navigateToSector(param: string = '', categoryParam: string = '', parentRoute = '') {

    this.router.navigate(
      [`/${parentRoute}`],
      { queryParams: { sector: param, category: categoryParam } }
    );
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }

  navigateToVendors(param: string = '', categoryParam: string = '', parentRoute = '') {

    this.router.navigate([`/${parentRoute}`], { queryParams: { sector: param, category: categoryParam } });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.getStores();
    this.getSectors();
    this.initCarousel();
    // this.fetchStoresBycategoryId();
  }

  private initCarousel(): void {
    const carouselInstance = new bootstrap.Carousel(this.carousel.nativeElement, {
      interval: 1000,
      pause: 'hover',
      wrap: true,
    });
  }
  /// search bar code
  params: any = {};
  sectorId: string = ''
  categoryId: string = '';
  location = ''
  noDataAvailable: boolean = false;
  // searchVenues(event: any) {
  //   this.fetchStoresBycategoryId(event.categoryId, event.location)
  // }


  venuesByCity = [];


  // fetchStoresBycategoryId(categoryId: string, location = "") {
  //   this.location = location;
  //   this.userservice.getAllStoresforhome(categoryId, location).subscribe((res: any) => {
  //     let data = res?.stores;
  //     let vendors: any = data.map((store: any) => {
  //       return {
  //         name: store?.businessdetails['businessName'],
  //         img: store.photos && store.photos.length ? store?.photos[0]?.url : 'assets/images/no-data.png',
  //         rating: 4, // get rating here from somewhere in future
  //         address: store?.location?.city,
  //         lowestFood: store?.faq?.platePricing,
  //         id: store._id,
  //         state: store?.location?.state,
  //         category: store.businessdetails.category._id,
  //         capacity: {
  //           min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max

  //         },
  //       }
  //     })
  //     if (vendors.length === 0) {
  //       this.noDataAvailable = true;
  //     } else {
  //       this.noDataAvailable = false;
  //     }
  //     this.venuesList = vendors
  //     let states = [...new Set(vendors.map((item: any) => item?.city))]
  //     let data2: any = []
  //     states.forEach(state => {
  //       data2.push({ 'city': state, venues: vendors.filter((item: any) => item?.state == state) })
  //     })
  //     data2 = data2.sort((a: any, b: any) => b.venues.length - a.venues.length)
  //     this.venuesByCity = data2;
  //     if(this.venuesByCity.length === 0 ){
  //       this.toastrService.error("no store found");
  //     }
  //   });
  // }

  // fetchStoresBycategoryId(categoryId: string, location = "") {
  //   this.location = location;
  //   this.userservice.getAllStoresforhome(categoryId, location).subscribe((res: any) => {
  //     let data = res?.stores;
  //     let vendors: any = data.map((store: any) => {
  //       return {
  //         name: store?.businessdetails['businessName'],
  //         img: store.photos && store.photos.length ? store?.photos[0]?.url : 'assets/images/no-data.png',
  //         rating: 4, // get rating here from somewhere in future
  //         address: store?.location?.city,
  //         lowestFood: store?.faq?.platePricing,
  //         id: store._id,
  //         state: store?.location?.state,
  //         category: store.businessdetails.category._id,
  //         capacity: {
  //           min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max
  //         },
  //       }
  //     })
  //     if (vendors.length === 0) {
  //       this.noDataAvailable = true;
  //     } else {
  //       this.noDataAvailable = false;
  //     }
  //     this.searchStore = vendors
  //     // let states = [...new Set(vendors.map((item: any) => item?.city))]
  //     // let data2: any = []
  //     // states.forEach(state => {
  //     //   data2.push({ 'city': state, venues: vendors.filter((item: any) => item?.state == state) })
  //     // })
  //     // data2 = data2.sort((a: any, b: any) => b.venues.length - a.venues.length)
  //     // this.venuesByCity = data2;
  //     // if(this.venuesByCity.length === 0 ){
  //     //   this.toastrService.error("no store found");
  //     // }
  //   });
  // }

  stores: any[] = [];
  handleSearchFilter(event: any): void {
    // Assuming the 'stores' property is part of the event payload
    this.stores = event.stores;
    this.searchprefred();

  }
  searchprefred() {

    this.searchPerformed = true;
  }
}

