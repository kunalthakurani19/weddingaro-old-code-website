import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  constructor(private http: HttpClient) { }
  // getWeddingDetails() {
  //   return this.http.get(`${environment.baseUrl}user/get-user-profile`,)
  // }
  // saveWeddingDetails(body: any = {}) {
  //   return this.http.put(`${environment.baseUrl}user/update-user-profile`, body, )
  // }

  // updateAttendance(payload: any) {
  //   return this.http.patch(`${environment.baseUrl}user/update-attandance-menu`, payload)
  // }
  // saveVendor(body = {}) {
  //   return this.http.post(`${environment.baseUrl}user/save-vendor`, body)
  // }
  

  // getTaskComplete(id: string){
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   return this.http.get(`${environment.baseUrl}user/complete-task/${id}`,{ headers })
  // }
  // getFavoriteStore() {
  //   return this.http.get(`${environment.baseUrl}user/get-favourite-vendors`)
  // }
  // requestPricing(body: any = {}) {
  //   return this.http.post(`${environment.baseUrl}user/create-request`, body)
  // }

  // getAllRequest() {
  //   return this.http.get(`${environment.baseUrl}user/get-all-request`)
  // }

  // deleteRequest(id: string) {
  //   return this.http.delete(`${environment.baseUrl}user/delete-request/${id}`)
  // }

  // getFavVendors() {
  //   return this.http.get(`${environment.baseUrl}user/get-favourite-vendors`);
  // }

  // getStoreById(id: string) {
  //   return this.http.get(`${environment.baseUrl}store/get-store/${id}`);
  // }


  // getAllStoresforhome(category: string = "", location: string = ""): Observable<any> {
  //   let params: HttpParams = new HttpParams();

  //   // Include 'category' if it is provided
  //   if (category.trim() !== "") {
  //     params = params.set('category', category);
  //   }

  //   // Include 'city' even if it is an empty string
  //   params = params.set('city', location);

  //   return this.http.get(`${environment.baseUrl}store/get-all-store`, { params });
  // }

  getStoreReview(id: string) {
    return this.http.get(`${environment.baseUrl}review/get-store-review/${id}`);
  }

  getVendorReview() {
    return this.http.get(`${environment.baseUrl}review/get-vendor-review`)
  }

  createReview(body = {}) {
    return this.http.post(`${environment.baseUrl}review/create-review`, body)
  }





}
