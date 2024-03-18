import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent {
  storeId:any='';
  availibilites:any=[];
  socialNetworkForm!:FormGroup;
  constructor(private formBuilder: FormBuilder,private vendorService:VendorService, private router: Router) {
    this.socialNetworkForm = this.formBuilder.group({
      facebook:[''],
      twitter:[''],
      pinterest:[''],
      instagram:[''],
    });
  }

  ngOnInit() {
    this.storeId = localStorage.getItem('storeId');
    this.getSocialNetwork(this.storeId || localStorage.getItem('storetoken'))
  }

  submitForm(){
        let payload = {
          "storeToken":this.storeId || localStorage.getItem('storetoken'),
          "details": { "key": "socialNetwork", "details": { ...this.socialNetworkForm.value } }
        }
        this.vendorService.createUpdateStore(payload).subscribe(res=>{
          this.getSocialNetwork(this.storeId || localStorage.getItem('storetoken'))
          this.router.navigateByUrl('/dashboard/storefront');
        })
    }
  getSocialNetwork(id:string){
    this.vendorService.getStoreById('socialnetwork',id).subscribe((res:any)=>{
      let data = JSON.parse(JSON.stringify(res?.stores[0]?.store?.socialnetwork || []))
      this.socialNetworkForm.patchValue(data)
    })
  }
}
