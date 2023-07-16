import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  cartData: cart[] | undefined
  priceSummary: priceSummary={
    price: 0,
    discount: 0,
    tax: 0,
    delivary: 0,
    total: 0
  }

  constructor(private _product: ProductService, private route: Router) {}

  ngOnInit(): void{
    this._product.currentCart().subscribe((res) => {
      // console.warn(res);
      this.cartData = res  
      let price= 0
      res  .forEach((items) => {
        if (items.quantity) {
          price = price + (+items.price * +items.quantity)
        }      }) 
      console.warn(price); 
      this.priceSummary.price= price
      this.priceSummary.discount = price/10
      this.priceSummary.tax = price/10
      this.priceSummary.delivary = 100 
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
      console.warn(this.priceSummary);
      
    })
  }

  checkout(){
    this.route.navigate(['checkout'])
  }

}
