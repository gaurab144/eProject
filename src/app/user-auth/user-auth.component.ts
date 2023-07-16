import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { cart, login, products, signUp } from '../data-type';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {

  showLogin: boolean = true

  authError: string = ''

  constructor(private _user: UserService, private _product: ProductService) { }

  ngOnInit(): void{
    this._user.userAuthReload();
  }

  signUp(data: signUp) {
    // console.warn(data)
    this._user.usersignUp(data)

  }

  login(data: login) {
    this._user.userLogin(data)
    this._user.invalidUserAuth.subscribe((res) => {
      console.warn(res);
      if (res) {
        this.authError = 'user not found'
      } else {
        this.localCartToRemoteCart()
      }

    })
  }

  openSignup() {
    this.showLogin = false
  }

  openLogin() {
    this.showLogin = true
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(data){
     let cartDataList:products[]= JSON.parse(data);
   
     cartDataList.forEach((product:products, index)=>{
       let cartData:cart={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this._product.addToCart(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCart')
       }
     })
    }
 
    setTimeout(() => {
     this._product.getCartList(userId)
    }, 2000);
     
   }
 }