import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  addProduct(data: products){
    console.warn("service called")
    return this._http.post('http://localhost:3000/products',data)
  }

  //<products[]> --[] is for array of products-- is used to difine get types which error occur in ts of component where this get function is called in component
  productList() {
    return this._http.get<products[]>('http://localhost:3000/products')
  }

  deleteProduct(id: number) {
    return this._http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id: string){
    return this._http.get<products>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product: products){
    return this._http.put<products>(`http://localhost:3000/products/${product.id}`, product)
  }

}
