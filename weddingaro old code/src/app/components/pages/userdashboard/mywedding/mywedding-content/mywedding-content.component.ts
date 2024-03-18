import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MyWeddingEditModalComponent } from '../my-wedding-edit-modal/my-wedding-edit-modal.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-mywedding-content',
  templateUrl: './mywedding-content.component.html',
  styleUrls: ['./mywedding-content.component.scss']
})
export class MyweddingContentComponent {

  constructor(private toastr: ToastrService, private dialog: MatDialog, private userService: UserService, private router: Router, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.createForm();    
  }

  weddingForm!: FormGroup;
  weddingDetails: any = {
    backgroundimage: '',
    eventDate: new Date(),
    name: '',
    parentimage: '',
    profilePic: '',
  }


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
  getImageSrc(): string {
    if (this.weddingDetails?.backgroundimage instanceof File) {
      // If it's a File, return a URL created from the blob
      return URL.createObjectURL(this.weddingDetails.backgroundimage);
    } else {
      // Otherwise, assume it's a URL
      return this.weddingDetails?.backgroundimage || 'https://weddingaro.s3.ap-south-1.amazonaws.com/side-images/wedding-status.png';
    }
  }
  getProfileSrc(): string {
    if (this.weddingDetails?.profilePic instanceof File) {
      // If it's a File, return a URL created from the blob
      return URL.createObjectURL(this.weddingDetails.profilePic);
    } else {
      // Otherwise, assume it's a URL
      return this.weddingDetails?.profilePic || '/assets/images/partner-photo.png';
    }
  }

  
  getParentSrc(): string {
    if (this.weddingDetails?.parentimage instanceof File) {
      // If it's a File, return a URL created from the blob
      return URL.createObjectURL(this.weddingDetails.parentimage);
    } else {
      // Otherwise, assume it's a URL
      return this.weddingDetails?.parentimage || '/assets/images/partner-photo.png';
    }
  }


  showModal = false;
  openModal() {
    
    this.showModal = true;
    this.cdr.detectChanges();
  }


  closeModal() {
    this.showModal = false;
  }

  createForm() {
    this.weddingForm = this.formBuilder.group({ 
      name: [''],  // feild is not there in api
      parentName: [''],
      sector: [''],
      parentsector: [''],
      
    });
  }


  onSubmit(): void {

  }



  alltask: any[] = [];
  totaltask!: number;
  completed!: number;
  notcompleted!: number;
  statusPercentage: number = 0
  items: any[] = [];
  getFavVendor() {
    this.userService.getAllVendor().subscribe((response: any) => {


      // this.items = Object.values(response.favariteStore).filter((item: any) => item.favoriteStore > 0);
      this.items = response.favariteStore;
    });
  }




  endDate: Date = new Date(); // Date when the countdown should end
  countdown: any = {};

  private countdownSubscription!: Subscription;
  ngOnInit() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.calculateTimeRemaining();
    });
    this.getWeddingDetails()
    this.getAlltask();
    this.gettotaltaskandnumber();
    this.getGuests();
    this.getFavVendor();


  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    // if (this.weddingDetails?.backgroundimage instanceof File) {
    //   URL.revokeObjectURL(this.getImageSrc());
    // }

  }


  gettotaltaskandnumber() {
    this.userService.getFilterCountKeywords().subscribe((response: any) => {
      if (response.success) {
        this.totaltask = response.filters.totalTask;
        this.completed = response.filters.completed;
        this.notcompleted = response.filters.notcompleted;


      } else {
        // Handle error if needed
      }
    });
  }

  getAlltask() {
    this.userService.getAllTask().subscribe((response: any) => {
      if (response.success) {
        this.alltask = response.tasks;
        // return response.task.id; // Assign the tasks from the response to the array
      }
    });
  }

  goToAllVendorByCategory(venueId: string) {
    this.router.navigate(['/user-dashboard/wedding-vendors/allvendorshow', venueId]);
  }


  getWeddingDetails() {
    this.userService.getWeddingDetails().subscribe((res: any) => {
      this.weddingDetails = { ...res['profile'] };
      this.endDate = new Date(res['profile']['eventDate']);
      this.statusPercentage = ((this.weddingDetails.completedService + this.weddingDetails.completedTask + this.weddingDetails.attendingGuest)) / ((this.weddingDetails.totalService + this.weddingDetails.totalTask + this.weddingDetails.totalGuest)) * 100
      this.weddingDetails.name = this.weddingDetails.user.fname + ' ' + this.weddingDetails.user.lname;
      this.weddingDetails.parentimage = res['profile']['familyDetails']['parentimage'];
      this.weddingDetails.profilePic = res['profile']['user']['profilePic'];


      this.weddingForm.patchValue({
        // name: this.weddingDetails.name,
        parentName: this.weddingDetails.familyDetails.parentName, // Assuming partnerName is the correct field
        sector: this.weddingDetails.sector,
        parentsector: this.weddingDetails.familyDetails.parentsector,
        
      });
     
    })
  }


    


  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.handleFileInput(file);
    }
  }
  
  onPFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.handleProfilePicInput(file);
    }
  }
  onParentSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.handleParentPicInput(file);
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

    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   // 'e.target.result' will be the Base64 representation of the image
    //   this.weddingDetails['backgroundimage'] = e.target.result
    //   this.changeImage()
    // };
    // reader.readAsDataURL(file);
    this.weddingDetails['backgroundimage'] = file;
    this.changeImage();
  }

  private handleProfilePicInput(file: File): void {
    // Check if the file is an image
    if (!file.type.startsWith('image')) {
      this.toastr.error('Only image files are allowed.');
      return;
    }

    this.weddingDetails['profilePic'] = file;
    this.changePImage();
  }

  private handleParentPicInput(file: File): void {
    // Check if the file is an image
    if (!file.type.startsWith('image')) {
      this.toastr.error('Only image files are allowed.');
      return;
    }

    this.weddingDetails['parentimage'] = file;
    this.changeParentImage();
  }

  private calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = this.endDate.getTime() - now;

    if (difference <= 0) {
      this.countdown = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    } else {
      this.countdown = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
  }
  // openDialog() {
  //   const dialogRef = this.dialog.open(MyWeddingEditModalComponent, {
  //     data: this.weddingDetails
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result?.isUpdate) {
  //       this.updateWeddingDetails(result.data)
  //     }
  //   });
  // }


  changeImage() {
    const formData = new FormData();
    formData.append('backgroundimage', this.weddingDetails['backgroundimage']);
    this.userService.saveWeddingDetails(formData).subscribe(res => {
      console.log(res);
      this.cdr.detectChanges();
    });
  }

  changePImage() {
    const formData = new FormData();
    formData.append('profilePic', this.weddingDetails['profilePic']);
    this.userService.saveWeddingDetails(formData).subscribe(res => {
      console.log(res);
      this.cdr.detectChanges();
    });
  }
  changeParentImage() {
    const formData = new FormData();
    formData.append('parentimage', this.weddingDetails['parentimage']);
    this.userService.saveWeddingDetails(formData).subscribe(res => {
      console.log(res);
      this.cdr.detectChanges();
    });
  }



  // updateWeddingDetails(data: any = {}) {
  //   const formData = new FormData();
  //   for (let key of Object.keys(data)) {
  //     formData.append(key, data[key])
  //   }
  //   this.userService.saveWeddingDetails(formData).subscribe(res => {
  //     this.getWeddingDetails()
  //   })
  // }

  updateWeddingDetails() {
    // const taskId = this.selectedTask._id;
    // const taskData = this.taskForm.value;

    // this.updateTask(taskId, taskData); 
    const formData = this.weddingForm.value;
    this.userService.saveWeddingDetails(formData).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.closeModal();
      this.getWeddingDetails();
      this.cdr.detectChanges();

    })
  }





  groupsData = {};
  menues: any = [];
  guests: any = {};

  getGuests() {
    this.userService.getGuests().subscribe((res: any) => {
      this.guests = res;
      let data: any = {}
      res.guests.map((item: any) => {
        data[item.groupname] = item.guests.slice(0, 3).map((guest: any) => {
          return {
            name: guest.fname + ' ' + guest.lname,
            image: guest.gender == 'male' ? "/assets/images/male.png" : "/assets/images/female.png",
            ...guest
          }
        })
      })
      console.log(data)
      this.groupsData = data
    })
  }



}


// see down for maps data

























// banner = [
//   {
//     title: 'Check if your wedding date is on an auspicious day.', text: 'Planning'

//   },
//   {
//     title: 'Do you want a destination wedding? ', text: 'Planning'

//   },
//   {
//     title: 'Short list date options for all pre-wedding functions. ', text: 'Planning'

//   },
// ];

// carditems = [
//   {
//     img: '/assets/images/pinkcircle.svg', title: 'COLOUR', season: 'Pink', couples: '48 couples'

//   },
//   {
//     img: '/assets/images/winterlandscape.svg', title: 'SEASON', season: 'Winter', couples: '285 couples'

//   },

//   {
//     img: '/assets/images/bowtie.svg', title: 'STYLE', season: 'Elegant', couples: '155 couples'

//   },
//   {
//     img: '/assets/images/honeymoon.svg', title: 'HONEYMOON', season: 'Dubai', couples: ''

//   },
// ];

// profiledeltails = [
//   {
//     img: '/assets/images/profilePic.pic',

//   },
//   {
//     img: '/assets/images/winterlandscape.svg',

//   },

//   {
//     img: '/assets/images/bowtie.svg', title: 'STYLE', season: 'Elegant', couples: '155 couples'

//   },

// ];