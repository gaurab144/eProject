import { Component } from '@angular/core';
import { SellerService } from '../shared/seller.service';
import { Router } from '@angular/router';
import { $signUp } from '../data-type';

@Component({
  selector: 'app-sales-auth',
  templateUrl: './sales-auth.component.html',
  styleUrls: ['./sales-auth.component.scss']
})
export class SalesAuthComponent {

  constructor(private _seller: SellerService, private router: Router) {}

  ngOnInit(): void{
    // this reloadSeller is defined in seller service and it is used to reload the signed in user if its already looged in or signed in
    this._seller.reloadSeller()
  }

  signUp(data: $signUp): void{

    this._seller.userSignUp(data) 

    // this is to check the flow for routing

    // this._seller.userSignUp(data).subscribe((result) => {
    //   if(result){
    //     this.router.navigate(['sales-home'])
    //   }
    // })
  }

}
