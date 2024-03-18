import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  storeId: any = '';
  menuForm!:FormGroup;
  selectedMenuItemId='';
  constructor(private vendorService: VendorService, private formBuilder:FormBuilder,) {
    this.createMenuForm();
    this.storeId = localStorage.getItem('storeId');
  }
  menus: any = []
  ngOnInit(): void {
    this.getMenus(this.storeId || localStorage.getItem('storetoken') )
  }

  public Editor = ClassicEditor;
  modalType: undefined | string = undefined;
  showModal = false;

  openModal(modalType: string,item:any={}) {
    this.showModal = true;
    this.modalType = modalType;
    this.selectedMenuItemId=item.uuid;
    if(this.modalType=='Edit'){
      this.menuForm.patchValue({...item})
    }
  }
  closeModal() {
    this.showModal = false;
    this.modalType = undefined;
    this.menuForm.reset()
  }
  deleteMenu(){
    let payload = {
      key:'menus',
      storeToken: this.storeId,
      uuid:this.selectedMenuItemId
    }
    this.vendorService.deleteStorePhoto(payload).subscribe((res:any)=>{
      this.getMenus(this.storeId || localStorage.getItem('storetoken'))
      this.closeModal()
    })
  }
  updateStore(){
    if(this.menuForm.invalid) return;
    const formData = new FormData();
    formData.append('key','menus');
    formData.append('storeToken',this.storeId || localStorage.getItem('storetoken'));
    formData.append('uuid',this.selectedMenuItemId)
    let payload =  {...this.menuForm.value}
    if (this.menuForm.invalid) return;
    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    this.vendorService.UpdateStore(formData).subscribe(res => {
      this.getMenus(this.storeId || localStorage.getItem('storetoken'))
      this.menuForm.reset();
      this.closeModal()
    })
  }
  getMenus(id: string) {
    this.vendorService.getStoreById('menus', id).subscribe((res: any) => {
      let data = JSON.parse(JSON.stringify(res?.stores[0]?.store?.menus || []))
      this.menus = data;
    })
  }
  submitForm() {
    if(this.menuForm.invalid) return;
    const formData = new FormData();
    formData.append('key','menus');
    formData.append('storeToken',this.storeId || localStorage.getItem('storetoken'));
    if(this.selectedMenuItemId) formData.append('uuid',this.selectedMenuItemId)
    let payload =  {...this.menuForm.value}
    if (this.menuForm.invalid) return;
    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    this.vendorService.createMultiPartStore(formData).subscribe(res => {
      this.getMenus(this.storeId || localStorage.getItem('storetoken'))
      this.menuForm.reset();
      this.closeModal()
    })
  }
  createMenuForm(){
    this.menuForm = this.formBuilder.group({
      menuName: ['', Validators.required],
      price: ['', Validators.required],
      menuDetails: ['', Validators.required],
    })
  }
}
