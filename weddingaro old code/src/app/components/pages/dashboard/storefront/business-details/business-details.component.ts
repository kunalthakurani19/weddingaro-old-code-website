import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { VendorService } from 'src/app/services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { countryCode } from 'src/countryCode';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {
  businessForm!: FormGroup;
  isNewForm: boolean = true;
  countryCodes = countryCode;
  storeId = "";
  sectors: any = [];
  categories: any = [];
  sectorCategoryMapper: any = {}
  ngOnInit(): void {
    this.createForm()
    this.getSectors()
    this.businessForm.get('countrycode')?.setValue('+91');
  }
  public Editor = ClassicEditor;
  constructor(private vendorService: VendorService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private toastrService: ToastrService) {
    // this.businessForm.get('countrycode')?.setValue('+91');
    this.activatedRoute.params.subscribe(res => {
      if (res.id || localStorage.getItem('storeId')) {
        if (res.id) {
          localStorage.setItem('storeId', res.id);
        }
        this.storeId = res.id ? res.id : localStorage.getItem('storeId');
        this.getFormData(res.id ? res.id : localStorage.getItem('storeId'));
      }

    })
  }

  getSectors() {
    this.vendorService.getSectors().subscribe((res: any) => {
      this.sectors = res['sector'];
      for (let sector of res['sector']) {
        this.sectorCategoryMapper[sector._id] = sector['categorys']
      }
    });
  }

 
  createForm() {
    this.businessForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      description: ['', Validators.required],
      sector: ['', Validators.required],
      category: ['', Validators.required],
      personName: ['', Validators.required],
      mobile: [null,[Validators.required,Validators.pattern(/^[0-9]{10}$/),],],
      email: ['', [Validators.required, Validators.required]],
      recieveOnWhatsapp: [],
      countrycode: ['', Validators.required]

    });

  }


 


  submitForm() {
    if (this.businessForm.invalid) return
    if (this.isNewForm) {
      this.vendorService.generateToken().subscribe((res: any) => {
        let payload = {
          "storeToken": res.storetoken.storeToken,
          "details": { "key": "businessdetails", "details": { ...this.businessForm.value } }
        }
        this.vendorService.createUpdateStore(payload).subscribe((res: any) => {
          localStorage.setItem('storetoken', res.details?.storetokenId?.storeToken);
          this.toastrService.success(res.message);
          this.router.navigateByUrl('dashboard/storefront/location')
        })
      })
    }
  }

  updateStore() {
    if (this.businessForm.invalid) return
    let payload = {
      "storeToken": this.storeId,
      "details": { "key": "businessdetails", "details": { ...this.businessForm.value } }
    }
    this.vendorService.createUpdateStore(payload).subscribe((res: any) => {
      this.toastrService.success(res.message);
      this.router.navigateByUrl('/dashboard/storefront/location')
    })
  }
  getFormData(id: string) {
    this.vendorService.getStoreById('businessDetails', id).subscribe((res: any) => {
      console.log(res)
      let data = JSON.parse(JSON.stringify(res.stores[0].store?.businessdetails))
      this.businessForm.patchValue({ ...data })
    })
  }
  // checkValidation(field: string) {
  //   if (this.businessForm.get(field)?.invalid) return
  //   let payload = { [field]: (this.businessForm.value[field] as string).trim() }
  //   if(field == 'mobile'){
  //     if(!this.businessForm.value.countrycode){
  //       this.toastrService.error('Please Select Country Code');
  //       return
  //     }
  //     payload = {...payload, countrycode:this.businessForm.value.countrycode}
  //   }
  //   this.vendorService.checkValidations(payload).subscribe((res: any) => {
  //     this.errorMsg[field].isValid = res.success;
  //   }, (e: any) => {
  //     let { error } = e
  //     this.errorMsg[field].isValid = error.valid;
  //   })
  // }


}
