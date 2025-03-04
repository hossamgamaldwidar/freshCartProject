import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userToken: any
  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private _PLATFORM_ID: object) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userToken = { token: sessionStorage.getItem('token') };
    } else {
      this.userToken = {};
    }
  }
  getLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`, { headers: this.userToken })
  }
  addProductToWishlist(p_Id:string):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`, { "productId": p_Id }, { headers: this.userToken })
  }
  removeProductFromWishlist(p_Id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_Id}`, { headers: this.userToken })
  }
}
