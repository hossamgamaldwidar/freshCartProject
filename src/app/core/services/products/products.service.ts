import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 private readonly _HttpClient :HttpClient = inject(HttpClient);
  constructor() { }

  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
  getAllProducts():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
}
