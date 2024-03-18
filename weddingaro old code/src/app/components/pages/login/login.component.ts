import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  google: any;
  loginForm!: FormGroup;
  role: string = 'user';
  googleSubscription = new Subscription();
  showPassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private authService: AuthService,
    private toastrService: ToastrService,
    private socialService: SocialAuthService,
    private router: Router
  ) {
    this.createForm();
    this.act.params.subscribe((res: any) => {
      this.role = res['role'] ? res['role'] : 'user';
    });
  }

  ngOnInit(): void {
    this.googleSubscription = this.socialService.authState.subscribe((user) => {
      this.loginWithGoogle(user);
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  forgotPassword() {
    sessionStorage.setItem('role', this.role)
    this.router.navigateByUrl('/forgot-password')
  }

  login() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.role, this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.authService.isLoggedIn.next(true);
        if (this.authService.userDetail.role === 'user') {
          this.router.navigateByUrl('/user-dashboard');
        }
        if (this.authService.userDetail.role === 'vendor') {
          this.router.navigateByUrl('/dashboard/storefront');
        }
      },
      (error: any) => {
        this.toastrService.error(error.error.message);
      }
    );
  }
  loginWithGoogle(user: any) {
    let payload = {
      email: user.email,
      socialid: user.id,
    };
    this.authService.socialLogin(payload).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        // if (this.role == 'user') {
        //   this.router.navigateByUrl('/home');
        // } else {
        //   this.router.navigateByUrl('/dashboard/storefront');
        // }
        this.authService.isLoggedIn.next(true);
        if (this.authService.userDetail.role === 'user') {
          this.router.navigateByUrl('/user-dashboard');
        }
        if (this.authService.userDetail.role === 'vendor') {
          this.router.navigateByUrl('/dashboard/storefront');
        }
      },
      (error: any) => {
        this.toastrService.error(error.error.message);
      }
    );
  }
  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  ngOnDestroy(): void {
    this.googleSubscription.unsubscribe();
    this.socialService?.signOut().catch((err) => {
      console.log(err);
    });
  }
}

