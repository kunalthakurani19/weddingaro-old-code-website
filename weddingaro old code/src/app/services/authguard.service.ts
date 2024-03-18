import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn.getValue()) {
      // User is already logged in, redirect to dashboard or another route.
      this.router.navigate(['/home']); // Adjust the route as needed.
      return false;
    }
    return true;
  }

  
}
