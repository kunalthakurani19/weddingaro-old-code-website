import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { baseUrl, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(private http: HttpClient) { }
  generateToken() {
    const payload = {
      totalKeys: [
        "businessdetails",
        "location",
        "faq",
        "photos",
        "availibility",
        "video",
        "menus",
        "events",
        "socialnetwork"
      ]
    };

    return this.http.post(`${environment.baseUrl}store/generate-token/9`, payload);
  }

  getSectors() {
    return this.http.get(`${environment.baseUrl}user/get-sector`)
  }
  createUpdateStore(body: any = {}) {
    return this.http.post(`${environment.baseUrl}store/`, body)
  }
  UpdateStore(body: any = {}) {
    return this.http.put(`${environment.baseUrl}store/`, body)
  }
  createMultiPartStore(body: any = {}) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.baseUrl}store/`, body, { headers })
  }
  getStore() {
    return this.http.get(`${environment.baseUrl}store`)
  }
  getAllStore() {
    return this.http.get(`${environment.baseUrl}store/get-all-store`)
  }
  getStoreById(tabKey: string, storeToken: string) {
    return this.http.get(`${environment.baseUrl}store?storeToken=${storeToken}`)
  }
  deleteStore(id: string) {
    return this.http.delete(`${environment.baseUrl}store/delete-store/${id}`)
  }
  checkValidations(body = {}) {
    return this.http.post(`${baseUrl}store/uniquevalidate`, body);
  }
  deleteStorePhoto(payload: any = {}) {
    return this.http.delete(`${environment.baseUrl}store/delete-media`,
      { body: payload })
  }
  getStoreBystoreId(storeToken: string) {
    return this.http.get(`${environment.baseUrl}store?storeToken=${storeToken}`)
  }


}

