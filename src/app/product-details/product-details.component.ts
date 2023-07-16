import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { cart, products } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  // making a property to pass in Html
  // here products is not array (products[]) because we are calling single product of specific Id
  productData: undefined | products

  removeCartData: products | undefined
  removeCart: boolean = false

  productQuantity: number = 1

  // this activeRoute is instance of activated route
  constructor(private activeRoute: ActivatedRoute, private _product: ProductService, private route: Router) { }

  ngOnInit() {
    // user is not logged in here
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    // console.warn(productId)
    productId && this._product.getProduct(productId).subscribe((res) => {
      // console.warn(res)
      this.productData = res
      // this case is for remove cart option
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData) // here items and item are two diff values items stors the localstorage parse object and item is defined for filter function which is productId
        items = items.filter((item: products) => {
          productId === item.id.toString()
        })
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
      // this is whwnuser looged in
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this._product.getCartList(userId)

        this._product.cartData.subscribe((res) => {
          let item = res.filter((item: products) =>
            productId?.toString() === item.productId?.toString()
          )
          if (item.length) {
            this.removeCartData = item[0]
            this.removeCart = true
          }
        })
      }
    })


  }

  handleQuantity(val: string) {
    // this if checks the productQuantity we defined eraly in the and the val of string is plus then the following methid is done and also the max value is defined as 20
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this._product.localAddToCart(this.productData);
        this.removeCart = true
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        this._product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this._product.getCartList(userId);
            this.removeCart = true
          }
        })

        this.route.navigate(['cart-page'])
      }

    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this._product.removeToCart(productId)
      // this.removeCart = true
    } else {
      console.warn(this.removeCartData);

      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.removeCartData && this._product.removeToCart(this.removeCartData.id)
      .subscribe((res) => {
        this._product.getCartList(userId)
      })

    }
    this.removeCart = true
  }

}
