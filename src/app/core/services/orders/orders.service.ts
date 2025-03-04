import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  userToken: any 
  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService , @Inject(PLATFORM_ID) private _PLATFORM_ID:object) { 
    if (isPlatformBrowser( this._PLATFORM_ID)){
      this.userToken = { token: sessionStorage.getItem('token') };
    }else{
      this.userToken = {};
    }
  }
  
  checkoutSession(c_id:string , data:object):Observable<any>{
  return this._HttpClient.post
  (`${environment.baseUrl}/api/v1/orders/checkout-session/${c_id}?url=http://localhost:4200`,
  {'shippingAddress':data},
  {headers: this.userToken})
  }

  getUserOrders(O_id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${O_id}`)
  }
}