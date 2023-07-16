import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, products } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // this event emitter is for showing the cartData as the function is called , {to fix the reload error}
  cartData = new EventEmitter<products[] | []>();

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

  //cart service
  localAddToCart(data: products){
    let cartData = [];
    let localCart = localStorage.getItem('localCart')
    // localCart could be undefined too at first so to check ! is required
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data])) // to store a data in local storage always use json stringfy
       this.cartData.emit([data]);
    }else{
      // this else function push the data if the addToCart is called again for the second and so on
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      console.warn(cartData);
      this.cartData.emit(cartData)
    }
  }

  localRemoveItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: products[] = JSON.parse(cartData);
      items = items.filter((item: products) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      console.warn(items);
      
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this._http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this._http
      .get<products[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        // console.warn(result);
        
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  // question adding in parameters by back tick `/${id}` and or by +id is same thing? personal search  
  removeToCart(cartId: number){
    return this._http.delete('http://localhost:3000/cart/'+cartId);
  }

  // using local sotrage busause we are getting the api based on user so user id is needed
  currentCart(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this._http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data: order){
    return this._http.post('http://localhost:3000/orders', data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this._http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this._http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this._http.delete('http://localhost:3000/orders/'+orderId)

  }

}
