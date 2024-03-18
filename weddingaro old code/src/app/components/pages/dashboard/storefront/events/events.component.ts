import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  constructor(private ngZone: NgZone, private formBuilder:FormBuilder, private vendorService:VendorService, private toastr:ToastrService){
    this.createEventForm();
    this.storeId = localStorage.getItem('storeId');
  }
  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.getEvents(this.storeId || localStorage.getItem('storetoken'))
  }
  minDate!: Date;
  maxDate!: Date;
  storeId:any='';

  eventForm!: FormGroup;
  maxSize: number = 5; // Max file size in MB
  selectedImage :File | null = null;
  typeOfEvents=[
    'Open Door',
    'Inaugration',
    'Contest',
    'Parade',
    'Concert',
    'Course',
    'Exposition',
    'Raffle'
  ]
  defaultMarkerOptions: google.maps.MarkerOptions = {};
  defaultMarker = new google.maps.Marker(this.defaultMarkerOptions);
  locationForm!:FormGroup
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,

  };
  latitude!: any;
  longitude!: any;
  events:any=[]
  @ViewChild('inputField') inputField!:ElementRef;
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;
  autoComplete: google.maps.places.Autocomplete | undefined;
  public Editor = ClassicEditor;
  invalidTime: boolean=false
  public ckeditorConfig = {
    styles: {
      height: '300px' // Set your desired height here
    }
  };
  ngAfterViewInit(): void {

    this.autoComplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);
    this.autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult | undefined = this.autoComplete?.getPlace();
        if (place?.geometry === undefined || place?.geometry === null) {
          return;
        }
        // this.locationForm.patchValue({place:place?.vicinity,formatted_address:place.formatted_address})
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
        console.log(place)
        this.defaultMarkerOptions = {
          position: place.geometry.location!,
          title:  place.name!,
          // draggable:true,
        };
        if (this.defaultMarker) {
          this.defaultMarker.setMap(null);
        }
        this.defaultMarkerOptions = {
          position: place.geometry.location!,
          title:  place.name!,
        };
         this.defaultMarker = new google.maps.Marker(this.defaultMarkerOptions);
        this.defaultMarker.setMap(this.map.googleMap!);
        this.map.googleMap!.panTo(place.geometry.location!);


      });
    });
  }
  createEventForm() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      endTime: ['', Validators.required],
      selectedImage:['']

      // Add more fields and validations as needed
    },
  );
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.handleFileInput(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const dataTransfer = event.dataTransfer;
    if (dataTransfer && dataTransfer.files.length > 0) {
      const file = dataTransfer.files[0];
      this.handleFileInput(file);
    }
  }

  private handleFileInput(file: File): void {
    // Check if the file is an image
    if (!file.type.startsWith('image')) {
      this.toastr.error('Only image files are allowed.');
      return;
    }

    // Check the file size (in bytes)
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > this.maxSize) {
      this.toastr.error('File size should be under 5 MB.');
      return;
    }

    // File is valid, you can now handle the file upload
    // If you want to display the image or perform any other operation, you can use FileReader
    const reader = new FileReader();
    reader.onload = (e:any) => {
      // 'e.target.result' will be the Base64 representation of the image
      this.selectedImage = e.target.result
      this.eventForm.patchValue({selectedImage:file})
    };
    reader.readAsDataURL(file);
  }
  submitForm(){
    if(this.eventForm.invalid) return;
    // this.invalidTime = this.compareTimes()
    // if(this.invalidTime) return;
    let startTime = new Date(this.eventForm.value['startTime']).toLocaleTimeString();
    let endTime = new Date(this.eventForm.value['endTime']).toLocaleTimeString();
    let startDate = this.formatDateToYYYYMMDD(this.eventForm.value['startDate']);
    let endDate = this.formatDateToYYYYMMDD(this.eventForm.value['endDate']);
    const formData = new FormData();
    formData.append('key','events');
    formData.append('storeToken',this.storeId || localStorage.getItem('storetoken'));
    let payload =  {...this.eventForm.value,endTime:endTime,startTime:startTime,endDate:endDate,startDate:startDate}
    for (let key in payload){
      formData.append(key,payload[key]);
    }
    this.vendorService.createMultiPartStore(formData).subscribe(res=>{
      this.getEvents(this.storeId || localStorage.getItem('storetoken'))
      this.eventForm.reset();
      this.selectedImage = null
    })
  }
  getEvents(id:string){
    this.vendorService.getStoreById('events',id).subscribe((res:any)=>{
      console.log(res)
      let data = JSON.parse(JSON.stringify(res?.stores[0]?.store?.events || []))
      for(let item of data){
        item['startDate']= new Date(item.startDate).toDateString();
        item['endDate']= new Date(item.endDate).toDateString();

      }
      this.events = data;
      console.log(data)
    })
  }

  formatDateToYYYYMMDD(date:any) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  compareTimes() {
    if (this.eventForm.value['startTime'] > this.eventForm.value['endTime']) {
      return true;
    } else {
      return false;
    }
  }
  convertTo12HourFormat(time:string) {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    if (parseInt(hours) >= 12) {
      period = "PM";
    }
    const hours12 = (parseInt(hours) % 12) || 12;
    return `${hours12}:${minutes} ${period}`;
  }
   getStatusFromDate(date:any) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      return "Expired";
    } else if (inputDate > currentDate) {
      return "Upcoming";
    } else {
      return "Ongoing";
    }
  }
  deleteEvent(id:string){
    console.log(id)
      let payload = {
        key:'events',
        storeToken: this.storeId || localStorage.getItem('storetoken'),
        uuid:id
      }
      this.vendorService.deleteStorePhoto(payload).subscribe((res:any)=>{
        this.getEvents(this.storeId || localStorage.getItem('storetoken'))
      })
  }
}
