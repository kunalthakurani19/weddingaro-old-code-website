import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  emailForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  step = 1;
  passwordDonotMatch: boolean = false
  resetPasswordToken: string = ''
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService, actRoute: ActivatedRoute,
    private toasterService: ToastrService, private router: Router) {
    this.createEmailForm()
    this.createPasswordForm()
    actRoute.params.subscribe(res => {
      if (res['token']) {
        this.step = 2;
        this.resetPasswordToken = res['token'];
      }
    })
  }

  ngOnInit(): void {
  }
  createPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    })
  }
  createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: sessionStorage.getItem('role')
    })
  }

  resetPassword() {
    if (this.emailForm.invalid) return
    this.authService.forgotPassword(this.emailForm.value).subscribe((res: any) => {
      this.toastrService.success(res.message)
    }, error => {
      this.toastrService.error(error.error.message)
    })
  }

  submitPasswords() {
    if (this.resetPasswordForm.invalid) return
    if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.confirmpassword) {
      this.passwordDonotMatch = true
      return
    }
    console.log(this.resetPasswordForm.value);
    this.authService.resetPassword(this.resetPasswordToken, this.resetPasswordForm.value).subscribe((res) => {
      this.toasterService.success('Password reset successfully, Please login to continue.');
      this.router.navigateByUrl('login/user');
    }, error => {
      this.toasterService.error(error.error.message)
    }
    )

  }
}
