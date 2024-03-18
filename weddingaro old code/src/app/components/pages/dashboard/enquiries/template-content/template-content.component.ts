import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { VendorService } from 'src/app/services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-template-content',
  templateUrl: './template-content.component.html',
  styleUrls: ['./template-content.component.scss']
})
export class TemplateContentComponent {
  businessForm!:FormGroup;
  isNewForm:boolean=true;
  ngOnInit(): void {
    this.createForm()
    this.getSectors()
  }
  public Editor = ClassicEditor;
  constructor(private vendorService:VendorService,private formBuilder: FormBuilder,private activatedRoute:ActivatedRoute){
    this.activatedRoute.params.subscribe(res=>{
      this.getFormData(res.id)
    })
  }
  getSectors(){
    this.vendorService.getSectors().subscribe((res:any)=>console.log(res));
  }
  routeCard:any=[
    { title:'Business details',route:'/dashboard/storefront/business-details'},
    { title:'Location and map',route:'/dashboard/storefront/location'},
    { title:'FAQs',route:'faqs'},
    { title:'Photos',route:'photos'},
    { title:'Videos',route:'videos'},
    { title:'Menus',route:'menus'},
    { title:'Availability',route:'availability'},
    { title:'Events',route:'events'},
    { title:'Social networks',route:'social-networks'}
   ]

   createForm() {
    this.businessForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      description: ['', Validators.required],
      sector: ['', Validators.required],
      category: ['', Validators.required],
      personName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      recieveOnWhatsapp: ['false']
    });

  }
  submitForm(){
    if(this.businessForm.invalid) return
    if(this.isNewForm){
      this.vendorService.generateToken().subscribe((res:any)=>{
        let payload = {
          "storeToken": res.storetoken.storeToken,
          "details": { "key": "businessdetails", "details": { ...this.businessForm.value } }
        }
        this.vendorService.createUpdateStore(payload).subscribe(res=>{
          console.log(res)
        })
      })
    }
  }
  getFormData(id:string){
    this.vendorService.getStoreById('businessDetails',id).subscribe((res:any)=>{
      console.log(res)
      let data = JSON.parse(JSON.stringify(res.stores[0].store?.businessdetails))
      this.businessForm.patchValue({...data})
    })
  }

}
