import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productsData } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class NewProductsService {
  public url: string = 'https://fakestoreapi.com/products';
  constructor(private _http: HttpClient) { }

  getNewProducts(): Observable<productsData[]> {
    return this._http.get<productsData[]>(this.url)
  }
}
