import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';
import { cart } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  totalPrice: number | undefined
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private _product: ProductService, private route: Router) {}

  ngOnInit(): void{
    this._product.currentCart().subscribe((result) => {
      let price= 0;
      result.forEach((item) => {
        if(item.quantity){
          price= price+ (+item.price* +item.quantity)
        }
      })
      this.totalPrice= price + (price / 10) + 100 - (price / 10)

      console.warn(this.totalPrice);
      

    })
  }

  orderNow(data: { email: string, address: string, contact: string }){
    let user= localStorage.getItem('user')
    let userId= user && JSON.parse(user).id

    if(this.totalPrice){
      let orderData= {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined    
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this._product.deleteCartItems(item.id);
        }, 700)
      })

      this._product.orderNow(orderData).subscribe((res) => {
        if(res){
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.route.navigate(['/my-orders'])
          }, 4000);        }
      })
    }

  }

}
