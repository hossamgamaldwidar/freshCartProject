import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  userToken: any
  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private _PLATFORM_ID: object) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userToken = { token: sessionStorage.getItem('token') };
    } else {
      this.userToken = {};
    }
  }
  addAddress(data: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/addresses`, data, { headers: this.userToken})
  };
  getLoggeUserAddresses():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses` ,{ headers: this.userToken});
  }
  removeAddress(a_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/addresses/${a_id}` ,{ headers: this.userToken});
  }
  updateLoggedUserPassword(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`, data , { headers: this.userToken})
  }
}
