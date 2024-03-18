import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { countryCode } from 'src/countryCode';

@Component({
  selector: 'app-pleaselogin-modal',
  templateUrl: './pleaselogin-modal.component.html',
  styleUrls: ['./pleaselogin-modal.component.scss']
})
export class PleaseloginModalComponent {


  loginForm!: FormGroup;
  role: string = 'user';
  showModal = false;
  loginModal = false;
  showSuccessModal: boolean = false;
  selected: boolean = false;
  selectedChange = new EventEmitter<boolean>();
  allFavVendor = [];
  sectorName = '';
  showGuestCountField = false;
  countryCodes = countryCode;

  constructor(
    private cdr: ChangeDetectorRef,
    private act: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<PleaseloginModalComponent>,
    private socialService: SocialAuthService,) {
   
    this.act.params.subscribe((res: any) => {
      this.role = res['role'] ? res['role'] : 'user';
    });
  }

  ngOnInit(): void {
    this.createForm();
    // Subscribe to router events to close the dialog on navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
          this.router.navigateByUrl('/dashboard');
        }

        this.dialogRef.close();

      },
      (error: any) => {
        this.toastrService.error(error.error.message);
      }
    );
  }


  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
