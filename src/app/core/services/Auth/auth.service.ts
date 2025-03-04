import { IToken } from './../../interfaces/itoken';
import { environment } from './../../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(private _HttpClient:HttpClient ,@Inject(PLATFORM_ID) private PLATFORM_ID: object) {
    this.decodeUserToken()
   }
  userToken!: IToken;
  userEmail!:string;
  decodeUserToken(){
    if(isPlatformBrowser(this.PLATFORM_ID)){
      if(sessionStorage.getItem('token')){
        this.userToken=jwtDecode(sessionStorage.getItem('token') !) 
        console.log(this.userToken);          
      }
    }
  }
  
  signup(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  signin(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }
  forgotPassword(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, { "email" :data })
  }
  verifyResetCode(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }
  resetPassword(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}
