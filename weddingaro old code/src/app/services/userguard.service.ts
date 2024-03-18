import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserguardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userRole = localStorage.getItem('userRole');
  
    if (userRole === 'user') {
      return true; // Allow access for vendors
    } 
    else {
      // Redirect to a different route (e.g., home) if the user is not a vendor
      return this.router.parseUrl('/home');
    }
  } 
}
