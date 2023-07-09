import { Component } from '@angular/core';
import { SellerService } from '../shared/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Component({
  selector: 'app-sales-auth',
  templateUrl: './sales-auth.component.html',
  styleUrls: ['./sales-auth.component.scss']
})
export class SalesAuthComponent {

  constructor(private _seller: SellerService, private router: Router) {}

  showLogin = true

  isError: string =''

  ngOnInit(): void{
    this._seller.reloadSeller()
    // this reloadSeller is defined in seller service and it is used to reload the signed in user if its already looged in or signed in
  }

  signUp(data: signUp): void{

    this._seller.userSignUp(data) 

    // this is to check the flow for routing

    // this._seller.userSignUp(data).subscribe((result) => {
    //   if(result){
    //     this.router.navigate(['sales-home'])
    //   }
    // })
  }

  login(data: login): void{
    this.isError= ''
    // console.warn(data)
    this._seller.userLogin(data)
    this._seller.$isLoginError.subscribe((error) => {
       if(error) {
        this.isError = 'Email or password is invalid'
       }else{
        this._seller.reloadSeller()
       }
    })
  }

  // toggle for signup and login
  openLogin() {
    this.showLogin = true
  }

  openSignUp() {
    this.showLogin = false
  }

}
