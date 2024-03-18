import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { imgLink } from 'src/assets/imgLinks';

@Component({
  selector: 'app-wedding-venue-page',
  templateUrl: './wedding-venue-page.component.html',
  styleUrls: ['./wedding-venue-page.component.scss'],
})

export class WeddingVenuePageComponent implements OnInit {
  params: any = {};
  sectorId: string = ''
  path: any

  constructor(private route: ActivatedRoute, private userservice: UserService, private router: Router) {

  }
  categoryId: string = '';
  location = ''
  hoveredIndex: number | null = null;


  venuesByCity: any = [

  ];
  venuesList = [

  ];
  faq = [
    {
      heading:
        'How to find the ideal wedding venue for your wedding functions?',
      discription:
        "When you have a clear vision for your wedding theme, finding that perfect wedding venue can be one of the most daunting tasks. Keep in mind that finding the ideal wedding venue is not just about how the property looks. Once you have an idea of your dates, guest list and budget you can begin shortlisting wedding venues. Cross-check the venue pricing to ensure it fits your wedding budget and your guest list size. Next, consider the weather and time of day to help you decide on the type of venue and if you'll be celebrating indoors or outdoors. Finally, shortlist wedding venues that will be able to create the wedding theme you want.",
    },
    {
      heading: 'How far in advance should I start looking for a wedding venue?',
      discription:
        "When you have a clear vision for your wedding theme, finding that perfect wedding venue can be one of the most daunting tasks. Keep in mind that finding the ideal wedding venue is not just about how the property looks. Once you have an idea of your dates, guest list and budget you can begin shortlisting wedding venues. Cross-check the venue pricing to ensure it fits your wedding budget and your guest list size. Next, consider the weather and time of day to help you decide on the type of venue and if you'll be celebrating indoors or outdoors. Finally, shortlist wedding venues that will be able to create the wedding theme you want.",
    },
    {
      heading: 'What are the different types of wedding venues?',
      discription:
        "When you have a clear vision for your wedding theme, finding that perfect wedding venue can be one of the most daunting tasks. Keep in mind that finding the ideal wedding venue is not just about how the property looks. Once you have an idea of your dates, guest list and budget you can begin shortlisting wedding venues. Cross-check the venue pricing to ensure it fits your wedding budget and your guest list size. Next, consider the weather and time of day to help you decide on the type of venue and if you'll be celebrating indoors or outdoors. Finally, shortlist wedding venues that will be able to create the wedding theme you want.",
    },
    {
      heading: 'Is booking the catering service of the venue compulsory?',
      discription:
        "When you have a clear vision for your wedding theme, finding that perfect wedding venue can be one of the most daunting tasks. Keep in mind that finding the ideal wedding venue is not just about how the property looks. Once you have an idea of your dates, guest list and budget you can begin shortlisting wedding venues. Cross-check the venue pricing to ensure it fits your wedding budget and your guest list size. Next, consider the weather and time of day to help you decide on the type of venue and if you'll be celebrating indoors or outdoors. Finally, shortlist wedding venues that will be able to create the wedding theme you want.",
    },
    {
      heading: 'What is the average cost of a wedding venue?',
      discription:
        "When you have a clear vision for your wedding theme, finding that perfect wedding venue can be one of the most daunting tasks. Keep in mind that finding the ideal wedding venue is not just about how the property looks. Once you have an idea of your dates, guest list and budget you can begin shortlisting wedding venues. Cross-check the venue pricing to ensure it fits your wedding budget and your guest list size. Next, consider the weather and time of day to help you decide on the type of venue and if you'll be celebrating indoors or outdoors. Finally, shortlist wedding venues that will be able to create the wedding theme you want.",
    },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sectorId = params.get('sectorId') || '';
      this.categoryId = params.get('categoryId') || '';

      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState) {
        this.sectorId = navigationState.sectorId || '';
        this.categoryId = navigationState.categoryId || '';
      }

      this.fetchStoresBycategoryId(this.categoryId);
      console.log("wedding venue sect id : ", this.sectorId);
      console.log("wedding venue cat id : ", this.categoryId);
    });
  }
  searchVenues(event: any) {
    this.fetchStoresBycategoryId(event.categoryId, event.location)
  }

  fetchStoresBycategoryId(categoryId: string, location = "") {
    this.location = location;
    this.userservice.getAllStores(categoryId, this.sectorId, location).subscribe((res: any) => {
      let data = res?.stores;
      let vendors: any = data.map((store: any) => {
        return {
          name: store?.businessdetails['businessName'],
          img: store.photos && store.photos.length ? store.photos.map((photo: any) => photo.url) : imgLink.noImageAvailble,
          rating: 4, // get rating here from somewhere in future
          address: store?.location?.city,
          lowestFood: store?.faq?.platePricing,
          id: store._id,
          state: store?.location?.city,
          category: store.businessdetails.category._id,
          capacity: {
            min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max

          },
        }
      })
      this.venuesList = vendors
      let states = [...new Set(vendors.map((item: any) => item?.state))]
      let data2: any = []
      states.forEach(state => {
        data2.push({ 'city': state, venues: vendors.filter((item: any) => item?.state == state) })
      })
      data2 = data2.sort((a: any, b: any) => b.venues.length - a.venues.length)
      this.venuesByCity = data2;
    });
  }


  // getStores(){
  //   //  before putting anything in vendor list we need to make sure that we are not allowing any store in array which is currentl
  //   // under review, currently this is not happening but future this will happen,
  //   // also instead of photo will come from url in the below , currently this is not happening.

  //       this.userservice.getAllStores(categoryId).subscribe((res:any)=>{
  //         let data = res?.stores;
  //         console.log(data)
  //        let vendors =  data.map((store:any)=>{
  //           return {
  //             name:store?.businessdetails['businessName'],
  //             img:store.photos && store.photos.length? store?.photos[0]?.storemedia : 'assets/images/no-data.png',
  //             rating:4, // get rating here from somewhere in future
  //             address:store?.location?.city,
  //             lowestFood:store?.faq?.platePricing,
  //             capacity: { min: store?.faq?.guestAccomodation.min, max: store?.faq?.guestAccomodation.max },
  //           }
  //         })
  //        this.venuesList = vendors
  //       })
  //     }
}
