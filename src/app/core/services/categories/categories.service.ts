import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private _HttpClient:HttpClient) { }
  getAllCategory(): Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getAllSupportedCategory(): Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories`)
  }
}
