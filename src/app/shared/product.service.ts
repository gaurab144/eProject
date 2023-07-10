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

  // here _limit helps to pass the data according to limit
  popularProducts(){
    return this._http.get<products[]>('http://localhost:3000/products?_limit=3')
  }

  trendyProducts(){
    return this._http.get<products[]>('http://localhost:3000/products?_limit=4')
  }

  // for search api `/...?q=${query}` is necessary
  searchProducts(query: string) {
    return this._http.get<products[]>(`http://localhost:3000/products?q=${query}`)
  }

}
