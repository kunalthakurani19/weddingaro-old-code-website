import { Component } from '@angular/core';
import { VendorProfileDashboardComponent } from '../vendor-profile-dashboard/vendor-profile-dashboard.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-dashboard',
  templateUrl: './user-profile-dashboard.component.html',
  styleUrls: ['./user-profile-dashboard.component.scss']
})
export class UserProfileDashboardComponent {

  draweritems = [
    {
      title: 'Wedding Planner',
      imgURL: '/assets/images/Diamond Ring.svg',
      route: '/user-dashboard/my-wedding'
    },
    {
      title: 'Checklist',
      imgURL: '/assets/images/testpassed.svg',
      route: '/user-dashboard/checklist'
    },
    {
      title: 'Guests',
      imgURL: '/assets/images/Management.svg',
      route: '/user-dashboard/guests', // Specify the route path for Guests
    },
    // {
    //   title: 'Budget',
    //   imgURL: '/assets/images/Accounting.svg',
    //   route: '/user-dashboard/budget', // Specify the route path for Budget
    // },
    {
      title: 'Wedding Vendors',
      imgURL: '/assets/images/Stall.svg',
      route: '/user-dashboard/wedding-vendors', // Specify the route path for Wedding Vendors
    },
    // {
    //   title: 'Settings',
    //   imgURL: '/assets/images/Settings.svg',
    //   route: '/user-dashboard/budget', // Specify the route path for Settings
    // },
  ];

  userDetail: any = [];

  ngOnInit() {
    this.getWeddingDetails();
  }

  constructor(public authService: AuthService, private router: Router , private toastrService: ToastrService ,private userService: UserService ){}



  logout() {
    // console.log(this.authService.isLoggedIn);
    this.authService.logout().subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userDetail');
        localStorage.removeItem('userRole');
        this.authService.isLoggedIn.next(false);
        localStorage.clear();
        this.toastrService.success(res.message);
        this.router.navigate(['/login/user']



        );
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }

  getWeddingDetails() {
    this.userService.getWeddingDetails().subscribe((res: any) => {

      if(res.success){
        this.userDetail = res.profile;
      }

    })
  }



}
