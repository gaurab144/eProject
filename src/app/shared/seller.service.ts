import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { $signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerSignedIn= new BehaviorSubject<boolean>(false) //this isSellerSignedIn is to check the boolean of auth canActivate & it is also a behaviour subject which is used to pass the value from one component to another for example this service is called in auth.guard 

  constructor(private _http: HttpClient, private router: Router ) { }

  userSignUp(data: $signUp) {
    this._http.post('http://localhost:3000/seller', data, {observe:'response'})
    .subscribe((result) => {
      this.isSellerSignedIn.next(true) //this next(true) pass the boolean ture for the canActivate and the following route is done
      localStorage.setItem('seller', JSON.stringify(result.body)) //JSON.stringify converts the JavaScript object or value to JSON string
      this.router.navigate(['sales-home'])
      console.warn('result', result)
    })
  }

  reloadSeller() {
    if(localStorage.getItem('seller')) {
      this.isSellerSignedIn.next(true)
      this.router.navigate(['sales-home'])
    }
  }

}
