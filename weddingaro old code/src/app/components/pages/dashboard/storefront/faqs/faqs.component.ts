import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {
  storeId:any='';
  faqForm={
    platePricing:'',
    guestAccomodation:{
      min:'',
      max:''
    },
    covid19Enabled:{
      informationNotAvailable: '',
      notOperational: '',
      yes:''
    },
    menuCaterings:{
      northIndian: '',
      italian: '',
      chinese:'',
      southIndian: '',
      garlicOnionFree: '',
      liveFoodCounters: '',
      chaat:'',
      seafood:'',
      drinks:''
    },
    eventSpaces:{
      banquet: '',
      hotel: '',
      farmHouse:'',
      lawn: '',
      resort: '',
      marriageGarden: '',
      palace:'',
      mandapam:'',
      marriageHalls:''
    }

  }
  ngOnInit(): void {
  }
  public Editor = ClassicEditor;
  constructor(private vendorService:VendorService,private formBuilder: FormBuilder,private activatedRoute:ActivatedRoute, private router:Router, private toastrService: ToastrService ){
        this.storeId = localStorage.getItem('storeId');
        this.getFormData(this.storeId);
  }

  submitForm(){
    let storeId = this.storeId || localStorage.getItem('storetoken');
        let payload = {
          "storeToken": storeId,
          "details": { "key": "faq", "details": { ...this.faqForm } }
        }
        this.vendorService.createUpdateStore(payload).subscribe((res : any)=>{
          this.toastrService.success(res.message);
          this.router.navigateByUrl('/dashboard/storefront/photos')
        })
  }

  updateStore(){
      let payload = {
        "storeToken": this.storeId,
        "details": { "key": "faq", "details": { ...this.faqForm } }
      }
      this.vendorService.createUpdateStore(payload).subscribe(res=>{
        this.router.navigateByUrl('dashboard/storefront')
      })
  }
  getFormData(id:string){
    this.vendorService.getStoreById('faq',id).subscribe((res:any)=>{
      let data = JSON.parse(JSON.stringify(res.stores[0].store?.faq))
      this.faqForm = data;
    })
  }
}
