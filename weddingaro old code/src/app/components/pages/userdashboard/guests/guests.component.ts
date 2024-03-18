import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { countryCode } from 'src/countryCode';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})
export class GuestsComponent implements OnInit {
  groups:any=[];
  guests:any={};
  groupName:string='';
  guestForm!:FormGroup;
  menues:any=[];
  menuForm!:FormGroup;
  countryCodes = countryCode;
  isEditOpen:boolean=false;
  guestId=''
  ngOnInit(): void {
    this.getGroups();
    this.getGuests();
    this.getMenues()
  }
createGuestForm(){
  this.guestForm = this.fb.group({
      "fname": ['', Validators.required],
      // "lname": ['', Validators.required],
      "companion":  this.fb.array([]),
      "age": ['', Validators.required],
      "gender": ['',Validators.required],
      "group": ['',Validators.required],
      "menues": ['',Validators.required],
      "email": ['',[ Validators.email ,Validators.required ]],
      "phonenumber": [''],
      "mobilenumber": [''],
      "address": [''],
      "town":[''],
      "country": ['India'],
      "pincode": ['']
  })
}
  createMenuForm(){
    this.menuForm = this.fb.group({
      "menuname": ['', Validators.required],
      "menuDescription": ['', Validators.required],
    })
  }
  constructor(private userService:UserService, private toasterService:ToastrService, private fb:FormBuilder) {
    this.createGuestForm();
    this.createMenuForm();
  }
  selectedButton: string = 'option1'; // Default selection
  groupsData = {
    // couple: [
    //   { name: 'Aman', image: '../../../../../assets/images/male.png' },
    //   { name: 'Neha', image: '../../../../assets/images/female.png' },
    //   { name: 'Aman', image: '../../../../assets/images/male.png' },
    // ],
    // friends: [
    //   { name: 'Aman', image: '../../../../assets/images/male.png' },
    //   { name: 'Neha', image: '../../../../assets/images/female.png' },
    //   { name: 'Aman', image: '../../../../assets/images/male.png' },
    // ],
    // colleagues: [
    //   { name: 'Aman', image: '../../../../assets/images/male.png' },
    //   { name: 'Neha', image: '../../../../assets/images/female.png' },
    //   { name: 'Aman', image: '../../../../assets/images/male.png' },
    // ],
  };
  selectButton(buttonId: string) {
    this.selectedButton = buttonId;
  }

  showGroupModal: boolean = false;
  showMenuModal:boolean = false;
  openAddGroupModel() {
    this.showGroupModal = true;
  }

  closeGroupModal() {
    this.showGroupModal = false;
    this.groupName ='' ;
  }

  openMenuModal() {
    this.showMenuModal = true;
  }
  closeMenuModal() {
    this.showMenuModal = false;
    this.menuForm.reset();
  }


  showGuestModal: boolean = false;

  openAddGuestModel() {
    this.showGuestModal = true;
  }

  closeGuestModal() {
    this.showGuestModal = false;
    this.guestForm.reset();
    this.isEditOpen=false;
    this.guestId='';

  }
  getGroups(){
    this.userService.getGroups().subscribe((res :any)=>{
      this.groups = res.groups;
    })
  }
  getGuests(){
    this.userService.getGuests().subscribe((res :any)=>{
      this.guests = res;
      let data:any = {}
      res.guests.map((item:any)=>{
          data[item.groupname]=item.guests.map((guest:any)=>{
            return {
              name:guest.fname + ' '+ guest.lname,
              image:guest.gender=='male' ? "/assets/images/male.png" : "/assets/images/female.png",
              ...guest,
              group:item._id
            }
          })
      })
      console.log(data)
      this.groupsData =data
    })
  }
  addGroup(){
    if(!this.groupName.length) return
   let payload = {groupname:this.groupName}
    this.userService.createGroups(payload).subscribe((res :any)=>{
      this.getGroups();
      this.groupName=''
      this.toasterService.success('Group created successfully!')
      this.closeGroupModal()
    })
  }
  getMenues(){
    this.userService.getMenues().subscribe((res :any)=>{
      this.menues = res.menus;
    })
  }



  addMenu(){
   let payload = {...this.menuForm.value}
    this.userService.createMenu(payload).subscribe((res :any)=>{
      this.menuForm.reset();
      this.getMenues();
      this.closeMenuModal()
      this.toasterService.success('Menu created successfully!')
    })
  }
  addGuest(){
    let payload = {...this.guestForm.value,lname:' '}
    this.userService.createGuest(payload).subscribe((res :any)=>{

      if(res.success){
        this.guestForm.reset();
      this.getGuests();
      this.closeGuestModal();
      this.toasterService.success('Guest Added successfully!')
      }
      else{
        this.toasterService.error('ples')
      }
      
    })
  }
  deleteEventEmitted(){
      this.getGuests()
  }
  openEditModal(guest:any){
    this.isEditOpen=true;
    this.openAddGuestModel();
    let payload = {...guest, ...guest.address}
    this.guestForm.patchValue(payload);
    this.guestId = guest._id
  }
  updateGuest(){
    let payload = {...this.guestForm.value}
    this.userService.updateGuests(payload, this.guestId).subscribe((res :any)=>{
      this.guestForm.reset();
      this.getGuests();
      this.closeGuestModal();
      this.guestId=''
      this.toasterService.success('Guest Updated successfully!')
    })
  }
  updateAttendance(data:any){
    this.userService.updateAttendance(data).subscribe((res:any)=>{
      this.getGuests()
    })
  }
}
