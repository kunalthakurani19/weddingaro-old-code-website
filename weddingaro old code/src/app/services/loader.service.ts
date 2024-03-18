import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests = 0;
  private isLoading = new BehaviorSubject<boolean>(false);

  get isLoading$() {
    return this.isLoading.asObservable();
  }

  showLoader(): void {
    if (this.activeRequests === 0) {
      this.isLoading.next(true);
    }
    this.activeRequests++;
  }

  hideLoader(): void {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.isLoading.next(false);
    }
  }
}
