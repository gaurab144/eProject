import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private _http: HttpClient, private route: Router) { }

  usersignUp(user: signUp) {
    this._http.post('http://localhost:3000/users', user, {observe: 'response'})
    .subscribe((result) => {
      // console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.route.navigate(['user-auth'])
        this.invalidUserAuth.emit(false)
      } else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userLogin(data:login){
    this._http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate([''])
    }
  }

}
