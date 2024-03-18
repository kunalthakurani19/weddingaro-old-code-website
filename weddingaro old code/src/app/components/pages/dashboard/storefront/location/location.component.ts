import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from 'src/app/services/vendor.service';
import { statesJSON } from 'src/india-city-state';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit, AfterViewInit {
  constructor(private ngZone: NgZone, private formBuilder: FormBuilder, private vendorService: VendorService, private router: Router, private toastrService: ToastrService) {
    this.createForm()
  }
  defaultMarkerOptions: google.maps.MarkerOptions = {};
  defaultMarker = new google.maps.Marker(this.defaultMarkerOptions);
  storeId = localStorage.getItem('storeId');
  storeToken = localStorage.getItem('storetoken');
  locationForm!: FormGroup;
  states = Object.keys(statesJSON);
  selectedState: string = '';
  cities: string[] = []; // Property to hold the
  selectedCity: string = '';

  onStateChange(event: any) {
    this.selectedState = event.target.value;
    this.cities = statesJSON[this.selectedState] || [];

  }




  ngOnInit() {
    if (this.storeId) this.getFormData(this.storeId)
    if (this.storeToken) this.getFormData(this.storeToken)
  }
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,

  };
  latitude!: any;
  longitude!: any;
  @ViewChild('inputField') inputField!: ElementRef;
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;
  autoComplete: google.maps.places.Autocomplete | undefined;
  ngAfterViewInit(): void {

    this.autoComplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);
    this.autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult | undefined = this.autoComplete?.getPlace();
        if (place?.geometry === undefined || place?.geometry === null) {
          return;
        }
        this.locationForm.patchValue({ place: place?.vicinity, formatted_address: place.formatted_address })
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
        console.log(place)
        this.defaultMarkerOptions = {
          position: place.geometry.location!,
          title: place.name!,
          // draggable:true,
        };
        if (this.defaultMarker) {
          this.defaultMarker.setMap(null);
        }
        this.defaultMarkerOptions = {
          position: place.geometry.location!,
          title: place.name!,
        };
        this.defaultMarker = new google.maps.Marker(this.defaultMarkerOptions);
        this.defaultMarker.setMap(this.map.googleMap!);
        this.map.googleMap!.panTo(place.geometry.location!);


      });
    });
  }

  createForm() {
    this.locationForm = this.formBuilder.group({
      completeAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      place: ['', Validators.required],
      formatted_address: [''],
      state: ['', Validators.required]
    });

  }
  submitForm() {
    let storeId = this.storeId || localStorage.getItem('storetoken');

    if (!storeId) {
      // Handle the case where both storeId and storetoken are not available
      console.error("Store ID is not available");
      return;
    }

    if (this.locationForm.invalid) {
      return;
    }

    let payload = {
      "storeToken": storeId,
      "details": { "key": "location", "details": { ...this.locationForm.value, ...this.center } }
    };

    this.vendorService.createUpdateStore(payload).subscribe((res: any) => {
      this.toastrService.success(res.message);
      this.router.navigateByUrl('/dashboard/storefront/faqs');
    });
  }


  updateStore() {
    if (this.locationForm.invalid) return
    let payload = {
      "storeToken": this.storeId,
      "details": { "key": "location", "details": { ...this.locationForm.value, ...this.center } }
    }
    this.vendorService.createUpdateStore(payload).subscribe((res: any) => {
      if (res.success) {
        this.router.navigateByUrl('/dashboard/storefront/faqs')
      }
    })
  }
  getFormData(id: string = '') {
    this.vendorService.getStoreById('location', id).subscribe((res: any) => {
      let data = JSON.parse(JSON.stringify(res.stores[0].store?.location))
      this.locationForm.patchValue({ ...data });
      this.center = { ...data.center }
      const defaultLatitude = data.lat;
      const defaultLongitude = data.lng;
      // Use the default latitude and longitude to set the initial center of the map
      this.center = {
        lat: defaultLatitude,
        lng: defaultLongitude,
      };
      // Retrieve the user's current geolocation if available
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };


      });
      this.defaultMarkerOptions = {
        position: this.center,
        title: data.place,
        // draggable:true
      };
      this.defaultMarker = new google.maps.Marker(this.defaultMarkerOptions);
      this.defaultMarker.setMap(this.map.googleMap!);
    })
  }

};
