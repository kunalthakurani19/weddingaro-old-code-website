import { AuthService } from './../../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { countryCode } from 'src/countryCode';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {
  isSignupWithGoogle = false;
  google: any;
  registrationForm!: FormGroup;
  role: string = 'user';
  registerSubscriber = new Subscription();
  googleRegistrationSubscription = new Subscription();
  showPassword = false;
  signUpWithGoogleForm = {}
  errorMsg: any = {
    email: {
      msg: 'This email is already registered with us',
      isValid: true
    },
    mobile: {
      msg: 'This Mobile number is already registered with us',
      isValid: true
    }
  }
  constructor(private formBuilder: FormBuilder, private act: ActivatedRoute, private authService: AuthService, private toastrService: ToastrService, private socialService: SocialAuthService,) {
    this.createForm()

    this.act.params.subscribe((res: any) => {
      this.role = res['role'] ? res['role'] : 'user';
      this.registrationForm.reset();
      this.signUpWithGoogleForm = {}
      this.isSignupWithGoogle = false;
      this.registrationForm.get('email')?.enable()
      this.registrationForm.get('fname')?.enable()
      this.registrationForm.get('lname')?.enable()
      this.registrationForm.get('countrycode')?.setValue('+91');

    })
  }
  countryCodes = countryCode

  createForm() {
    this.registrationForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [null,[Validators.required,Validators.pattern(/^[0-9]{10}$/),],],
      countrycode: ['+91', Validators.required], // Set the default value to +93 (Afghanistan)
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
      role: this.role
    });
  }

  onPhoneNumberInput(event: any) {
    // Remove non-numeric characters from input
    const inputValue = event.target.value.replace(/\D/g, '');
    this.registrationForm.patchValue({ mobile: inputValue });
  }
  

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.googleRegistrationSubscription = this.socialService.authState.subscribe((user: any) => {
      console.log(user)
      if (user) {
        let payLoad = {
          "fname": user?.firstName,
          "lname": user?.lastName,
          "profilePic": user?.photoUrl ? user?.photoUrl : '',
          "email": user?.email,
          "mobile": user?.mobile ? user?.mobile : '',
          "countrycode": localStorage.getItem('countryCode'),
          "role": this.role,
          "registractionform": user?.provider,
          "socialid": user?.id
        }
        this.signUpWithGoogleForm = { ...payLoad }
        this.registrationForm.patchValue({ ...payLoad })
        this.registrationForm.get('email')?.disable()
        this.registrationForm.get('fname')?.disable()
        this.registrationForm.get('lname')?.disable()
        this.isSignupWithGoogle = true;
      }
    });
  }

  get getFormValues() {
    return this.registrationForm.controls
  }
  onSubmit() {
    if (this.registrationForm.invalid) return
    this.authService.registerUser({ ...this.registrationForm.value, role: this.role }).subscribe((res: any) => {
      this.toastrService.success("Your account has been successfully registered, Please check your mailbox to activate your account.")
      this.registrationForm.reset()
    }, error => {
      console.log(error)
    })
  }
  checkValidation(field: string) {
    if (this.registrationForm.get(field)?.invalid) return
    let payload = { [field]: this.registrationForm.value[field] }
    if (field == 'mobile') {
      if (!this.registrationForm.value.countrycode) {
        this.toastrService.error('Please Select Country Code');
        return
      }
      payload = { ...payload, countrycode: this.registrationForm.value.countrycode }
    }
    this.authService.checkValidations({ ...payload, role: this.role }).subscribe((res: any) => {
      this.errorMsg[field].isValid = res.success;
    }, (e: any) => {
      let { error } = e
      this.errorMsg[field].isValid = error.valid;
    })
  }

  loginWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => console.log('Console.log')).catch(err => {
        this.toastrService.error(err.err.message)
      });
  }

  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signInWithFB(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signUpWithGoogle() {
    console.log(this.registrationForm.value)
    if (this.registrationForm.invalid) return
    let payload = { ...this.signUpWithGoogleForm, ...this.registrationForm.value }
    this.authService.socialRegistrations(payload).subscribe((res: any) => {
      this.toastrService.success("Your account has been successfully registered, Please check your mailbox to activate your account.")
      this.registrationForm.reset();
      this.signUpWithGoogleForm = {}
      this.isSignupWithGoogle = false;
      this.registrationForm.get('email')?.enable()
      this.registrationForm.get('fname')?.enable()
      this.registrationForm.get('lname')?.enable()
    }, error => {
      this.toastrService.error(error.error.message)
    })

  }
  ngOnDestroy(): void {
    this.socialService?.signOut().catch(err => {
      console.log(err)
    });
    this.registerSubscriber.unsubscribe()
    this.googleRegistrationSubscription.unsubscribe()

  }

}
