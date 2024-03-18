import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
},
)
export class AppComponent {
  showNavbarAndFooter: boolean = true;
  constructor(public loaderService: LoaderService, private authService:AuthService,private act:ActivatedRoute, private router: Router){
    this.authService.isLoggedIn.next(!!localStorage.getItem('token'));
    this.authService.getLocation();
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbarAndFooter = !['/login/user', '/signup/user', '/login/vendor','/signup/vendor', '/forgot-password', '/adminpanel', '/adminpanel/setting', '/adminpanel/store', '/adminpanel/user','/adminpanel/dashboard'].includes(event.urlAfterRedirects);
      } else if (event instanceof NavigationStart) {
        // Handle NavigationStart event if needed
      }
    });
    this.act.params.subscribe((res: any) => {
      if(res['token']){
        this.authService.activateAccount(res['token']);
      }
    }
    )
  }
  title = 'wedding-webapp';
}
