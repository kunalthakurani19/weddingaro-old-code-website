import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vendor-profile-dashboard',
  templateUrl: './vendor-profile-dashboard.component.html',
  styleUrls: ['./vendor-profile-dashboard.component.scss']
})
export class VendorProfileDashboardComponent {
  userDetail: any = [];
  profilePicFile: File | null = null;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  ngOnInit(): void {
    this.getWeddingDetails(); // Restore user details from localStorage
  }

  draweritems = [
    {
      title: 'Home',
      imgURL: '/assets/images/dhomeicon.svg',
      route: '/dashboard/home'
    },
    {
      title: 'Storefront',
      imgURL: '/assets/images/dstorefronticon.svg',
      route: '/dashboard/storefront'
    },
    {
      title: 'Enquiries',
      imgURL: '/assets/images/denquiriesicon.svg',
      route: '/dashboard/enquiries', // Specify the route path for Guests
    },
    {
      title: 'Reviews',
      imgURL: '/assets/images/dreviewicon.svg',
      route: '/dashboard/review', // Specify the route path for Budget
    },
    // {
    //   title: 'Settings',
    //   imgURL: '/assets/images/dsettingicon.svg',
    //   route: '/dashboard/setting', // Specify the route path for Wedding Vendors
    // },
    // {
    //   title: 'Settings',
    //   imgURL: '/assets/images/Settings.svg',
    //   route: '/user-dashboard/budget', // Specify the route path for Settings
    // },
  ];






  constructor(public authService: AuthService, private router: Router, private toastrService: ToastrService, private userService: UserService, private cdr: ChangeDetectorRef) { }




  logout() {
    this.authService.logout().subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userDetail');
        localStorage.removeItem('userRole');
        localStorage.clear();
        this.authService.isLoggedIn.next(false);
        this.toastrService.success(res.message);
        this.router.navigate(['/login/user']

        );
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.isValidImage(file)) {
        this.uploadProfilePic(file);
      } else {
        this.toastrService.error('Only image files are allowed.');
        // You can display an error message to the user.
      }
    }
  }

  isValidImage(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

    if (allowedTypes.includes(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  uploadProfilePic(file: File) {
    const formData = new FormData();
    formData.append('profilePic', file);

    // Modify the form data sent to the service.
    // formData.append('otherField', 'otherValue'); // If other fields are required by the service.

    // You can make a copy of the existing userDetail to handle potential errors.
    const previousUserDetail = { ...this.userDetail };

    this.userService.saveWeddingDetails(formData).subscribe(
      (res: any) => {
        if (res.success) {
          this.userDetail.user.profilePic = res.profile.user.profilePic;
          this.cdr.detectChanges();
          // Update the user's profile picture in your component.
        }
      },
      (error) => {
        console.error('Profile picture upload failed:', error);
        // Revert the userDetail to the previous state if there's an error.
        this.userDetail = previousUserDetail;
      }
    );
  }
  getWeddingDetails() {
    this.userService.getWeddingDetails().subscribe((res: any) => {

      if (res.success) {
        this.userDetail = res.profile;
        this.cdr.detectChanges();
      }

    })
  }


}
