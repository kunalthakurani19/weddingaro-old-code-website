import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment'
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);
  defaultCountryCode: string = '+91';

  userDetail: any;
  constructor(private http: HttpClient, private toastrService: ToastrService) { }
  registerUser(body = {}) {
    return this.http.post(`${baseUrl}auth/register`, body);
  }

  checkValidations(body = {}) {
    return this.http.post(`${baseUrl}auth/uniquevalidate`, body);
  }

  getLocation() {
    this.http.get('https://ipapi.co/json/').subscribe((res: any) => {
      localStorage.setItem('countryCode', res.country_calling_code)
      localStorage.setItem('country', res.country_name)
    })
  }

  socialRegistrations(body = {}) {
    return this.http.post(`${baseUrl}auth/social-register`, body)
  }
  login(role: string = 'user', payload: any = {}) {
    let url: any;
    if (role == 'user') {
      url = this.http.post(`${baseUrl}auth/login`, payload);
    }
    if (role == 'vendor') {
      url = this.http.post(`${baseUrl}auth/vendor-login`, payload);
    }
    return url.pipe(
      tap((res: any) => {
        if (res && res.token) {
          this.userDetail = res.details;
          localStorage.setItem('userRole', res.details.role);
          localStorage.setItem('token', res.token);
          localStorage.setItem('userDetail', JSON.stringify(res.details));
          this.isLoggedIn.next(true); // Set isLoggedIn to true after successful login
          console.log(this.isLoggedIn);
        }
      })
    );
  }
  



  socialLogin(body: any = {}) {
    return this.http.post(`${baseUrl}auth/social-login`, body)
  }
  activateAccount(token = '') {
    return this.http.get(`${baseUrl}auth/active-account/${token}`).subscribe((res: any) => {
      this.toastrService.success(res.message)
    }, error => {
      this.toastrService.error(error.error.message)
    })
  }
  resetPassword(token = '',body={}) {
    return this.http.put(`${baseUrl}auth/change-password/?token=${token}`,body)
  }

  forgotPassword(body = {}) {
    return this.http.post(`${baseUrl}auth/reset-password-link`, body)
  }
  createPassword(body = {}) {
    return this.http.post(`${baseUrl}auth/change-password`, body)

  }
  logout() {
    return this.http.get(`${baseUrl}auth/logout`);
  }


  

}
