import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { products } from '../data-type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor (private route: Router, private _product: ProductService) {}

  menuType: string =''

  sellerName: string =''

  userName: string ='' 

  cartItems= 0;

  //for showing the search result
  searchResult: undefined | products[]

  ngOnInit(): void{
    this.route.events.subscribe((val: any) => {
      if(val.url){
        // console.warn(val.url)
        // for changing the navbar according to seller-user and home [menuType value checks if the navbar for seller and default]
        if(localStorage.getItem('seller') && val.url.includes('sales')){
          // console.warn('inside seller area')
          this.menuType='seller'
          if(localStorage.getItem('seller')){
            let store= localStorage.getItem('seller') // here the localstorage value is store in Json string formate
            let sData= store && JSON.parse(store)[0]
            this.sellerName = sData.name 
          }
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName =userData.name
          this.menuType= 'user'
          this._product.getCartList(userData.id)

        }else{
          // console.warn('outside seller area')
          this.menuType='default'
        }
      }
    })

    // cartData is storing the data from local storage to show in cartItems which is displayed in html
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
    // here res is the items that are added in the local storage and the cartItems is used to hold the length of items
    this._product.cartData.subscribe((res) => {
      this.cartItems = res.length
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate([''])
  }

  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate([''])
    this._product.cartData.emit([])
  }

  // query is used here for auto search , method for search
  searchProduct(query: KeyboardEvent) {
    if(query){
      const element = query.target as HTMLInputElement
      // console.warn(element.value)
      this._product.searchProducts(element.value).subscribe((res) => {
        // console.warn(res)
        // for showing the result upto 5 data only or it will display all result , it is for managing large data
        if(res.length>5){
          res.length = 5
        }
        this.searchResult = res
      })

    }
  }

  hideSearch() {
    this.searchResult = undefined
  }

  submitSearch(val: string) {
    console.warn(val)
    this.route.navigate([`search/${val}`])
  }

  redirectoDetails(id: number){
    this.route.navigate(['/details/'+id])

  }

}
