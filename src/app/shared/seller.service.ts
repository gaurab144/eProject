import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // $ is given to address subjects or behaviour subject
  //this isSellerSignedIn is to check the boolean of auth canActivate & it is also a behaviour subject which is used to pass the value from one component to another for example this service is called in auth.guard 
  $isSellerSignedIn= new BehaviorSubject<boolean>(false) 

  // this event emitter for the login error massage . is called when seller.user login is error
  $isLoginError= new EventEmitter<boolean>(false)

  constructor(private _http: HttpClient, private router: Router ) { }

  // here signUp is an interface for data-type. it is object here contains email:string and password:string 
  userSignUp(data: signUp) {
    this._http.post('http://localhost:3000/seller', data, {observe:'response'})
    .subscribe((result) => {
      this.$isSellerSignedIn.next(true) //this next(true) pass the boolean ture for the canActivate and the following route is done
      localStorage.setItem('seller', JSON.stringify(result.body)) //JSON.stringify converts the JavaScript object or value to JSON string
      this.router.navigate(['sales'])
      // console.warn('result', result)
    })
  }

  reloadSeller() {
    if(localStorage.getItem('seller')) {
      this.$isSellerSignedIn.next(true)
      this.router.navigate(['sales-home'])
    }
  }

  userLogin(data: login){
    // console.warn(data)
    this._http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response'})
    .subscribe((result: any) => {
      console.warn(result)
      if(result && result.body && result.body.length===1){
        this.$isLoginError.emit(false)
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['sales-home'])
        //  alert('user loged in')
      }else{
        // alert('login failed')
        this.$isLoginError.emit(true)

      }
    })
  }

}
