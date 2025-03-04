import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { AuthService } from '../Auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userToken: any 
  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService , @Inject(PLATFORM_ID) private _PLATFORM_ID:object) { 
    if (isPlatformBrowser(this._PLATFORM_ID)){
      this.userToken = { token: sessionStorage.getItem('token') };
    }else{
      this.userToken = {};
    }
  }
  
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, { headers: this.userToken});
  }
  addToCart(p_Id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, { "productId": p_Id },{ headers: this.userToken});
  }
  removeSpecificCartItem(c_Id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${c_Id}`, { headers: this.userToken });
  }
  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, { headers: this.userToken });
  }
  updateCartProductQuantity(p_Id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_Id}`, { "count": count }, { headers: this.userToken });
  }
}
