import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { VendorService } from 'src/app/services/vendor.service';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  dateRangeForm: FormGroup;
  minDate!: Date;
  maxDate!: Date;
  storeId:any='';
  availibilites:any=[]
  constructor(private formBuilder: FormBuilder,private vendorService:VendorService) {
    this.dateRangeForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.storeId = localStorage.getItem('storeId');
    this.getAvailabilities(this.storeId || localStorage.getItem('storetoken'))
  }

  submitForm(){
    if(this.dateRangeForm.invalid) return
    console.log(this.dateRangeForm.value)
        const formData = new FormData();
        formData.append('key','availibility');
        formData.append('startDate',this.formatDateToYYYYMMDD(this.dateRangeForm.value['startDate']))
        formData.append('endDate',this.formatDateToYYYYMMDD(this.dateRangeForm.value['endDate']))
        formData.append('storeToken',this.storeId || localStorage.getItem('storetoken'));
        this.vendorService.createMultiPartStore(formData).subscribe(res=>{
          this.dateRangeForm.reset()
          this.getAvailabilities(this.storeId || localStorage.getItem('storetoken'));
        })
    }
  getAvailabilities(id:string){
    this.vendorService.getStoreById('availibility',id).subscribe((res:any)=>{
      let data = JSON.parse(JSON.stringify(res?.stores[0]?.store?.availibility || []))
      for(let item of data){
        item['startDate']= new Date(item.startDate).toDateString();
        item['endDate']= new Date(item.endDate).toDateString();

      }
      this.availibilites = data;
    })
  }
  convertDate(date:any){
    return date?.toDateString();
  }
  deleteSchedule(id:string){
    console.log(id)
      let payload = {
        key:'availibility',
        storeToken: this.storeId ||  localStorage.getItem('storetoken') ,
        uuid:id
      }
      this.vendorService.deleteStorePhoto(payload).subscribe((res:any)=>{
        this.getAvailabilities(this.storeId || localStorage.getItem('storetoken'))
      })
  }


   formatDateToYYYYMMDD(date:any) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
