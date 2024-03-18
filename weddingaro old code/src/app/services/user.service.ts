import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getWeddingDetails() {
    return this.http.get(`${environment.baseUrl}user/get-user-profile`,)
  }
  saveWeddingDetails(body: any = {}) {
    return this.http.put(`${environment.baseUrl}user/update-user-profile`, body, )
  }

  getCategory() {
    return this.http.get(`${environment.baseUrl}user/get-category`,)
  }

  createTask(body: any = {}) {

    return this.http.post(`${environment.baseUrl}user/create-task`, body,)
  }

  getAllTask() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.get(`${environment.baseUrl}user/get-all-task?limit=10&page=1`, { headers })
  }

  deletetask(id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.delete(`${environment.baseUrl}user/delete-task/${id}`, { headers })
  }

  getFilterCountKeywords() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.get(`${environment.baseUrl}user/filter-count-and-keyword`, { headers })
  }

  getTaskComplete(id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.get(`${environment.baseUrl}user/complete-task/${id}`, { headers })
  }

  updateTask(id: string, body: any = {}) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put(`${environment.baseUrl}user/updated-task?id=${id}`, body, { headers })
  }

  // filterTasks(keywords: string[], categories: string[]): Observable<any> {

  //   const requestBody = {
  //     keyword: keywords,
  //     category: categories,
  //   };

  //   return this.http.post(`${environment.baseUrl}user/filter-task`, requestBody );

  // }






  filteredTasks(filters: any, page: number, limit: number) {
    return this.http.post(`${environment.baseUrl}user/filter-task?limit=${limit}&page=${page}`, filters);
  }

  private selectedDatesSource = new BehaviorSubject<string[]>([]);
  selectedDates$ = this.selectedDatesSource.asObservable();

  private selectedCategoriesSource = new BehaviorSubject<string[]>([]);
  selectedCategories$ = this.selectedCategoriesSource.asObservable();

  updateSelectedDates(dates: string[]) {
    this.selectedDatesSource.next(dates);
  }

  updateSelectedCategories(categories: string[]) {
    this.selectedCategoriesSource.next(categories);
  }





  

  getAllStores(category: string = "", sector = "", location: string = '') {
    const params = {
      category: category,
      city: location,
      sector: sector
    }
    return this.http.get(`${environment.baseUrl}store/get-all-store`, { params });
  }
  getGroups() {
    return this.http.get(`${environment.baseUrl}user/get-all-group`)
  }
  createGroups(body = {}) {
    return this.http.post(`${environment.baseUrl}user/create-group`, body)
  }
  updateGroup(body = {}, id = '') {
    return this.http.put(`${environment.baseUrl}user/update-group?id=${id}`, body)
  }
  removeGroup(id = '') {
    return this.http.delete(`${environment.baseUrl}user//delete-group/${id}`)
  }
  getGuests() {
    return this.http.get(`${environment.baseUrl}user/get-all-guest`)
  }
  createGuest(body = {}) {
    return this.http.post(`${environment.baseUrl}user/create-guest`, body)
  }
  updateGuests(body = {}, id = '') {
    return this.http.put(`${environment.baseUrl}user/update-guest?id=${id}`, body)
  }
  removeGuest(id = '') {
    return this.http.delete(`${environment.baseUrl}user/delete-guest/${id}`)
  }

  getMenues() {
    return this.http.get(`${environment.baseUrl}user/get-all-menu`)
  }
  createMenu(body = {}) {
    return this.http.post(`${environment.baseUrl}user/create-menu`, body)
  }
  updateMenu(body = {}, id = '') {
    return this.http.put(`${environment.baseUrl}user/update-menu?id=${id}`, body)
  }
  removeMenu(id = '') {
    return this.http.delete(`${environment.baseUrl}user/delete-menu/${id}`)
  }
  updateAttendance(payload: any) {
    return this.http.patch(`${environment.baseUrl}user/update-attandance-menu`, payload)
  }
  saveVendor(body = {}) {
    return this.http.post(`${environment.baseUrl}user/save-vendor`, body)
  }
  removeVendor(body = {}) {
    return this.http.put(`${environment.baseUrl}user/remove-vendor`, body)
  }

  getAllVendor() {
    return this.http.get(`${environment.baseUrl}user/get-all-vendor`)
  }
  filterVendorByCategory(venueId: string) {
    return this.http.get(`${environment.baseUrl}user/filter-vendor/${venueId}`)
  }

  // getTaskComplete(id: string){
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   return this.http.get(`${environment.baseUrl}user/complete-task/${id}`,{ headers })
  // }
  getFavoriteStore() {
    return this.http.get(`${environment.baseUrl}user/get-favourite-vendors`)
  }
  requestPricing(body: any = {}) {
    return this.http.post(`${environment.baseUrl}user/create-request`, body)
  }

  getAllRequest() {
    return this.http.get(`${environment.baseUrl}user/get-all-request`)
  }

  deleteRequest(id: string) {
    return this.http.delete(`${environment.baseUrl}user/delete-request/${id}`)
  }

  getFavVendors() {
    return this.http.get(`${environment.baseUrl}user/get-favourite-vendors`);
  }

  getStoreById(id: string) {
    return this.http.get(`${environment.baseUrl}store/get-store/${id}`);
  }


  getAllStoresforhome(category: string = "", location: string = ""): Observable<any> {
    let params: HttpParams = new HttpParams();

    // Include 'category' if it is provided
    if (category.trim() !== "") {
      params = params.set('category', category);
    }

    // Include 'city' even if it is an empty string
    params = params.set('city', location);

    return this.http.get(`${environment.baseUrl}store/get-all-store`, { params });
  }

}
