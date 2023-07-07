import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './shared/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _seller: SellerService) {} //here this service used because $isSellerSignedIn is a behaviour subject with boolean type value which is defined in seller service

  //this canActivate guard the route to ['sales-home'] page using the isSellerSignedIn value. sales-home is the page for the user who want to sell their product
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._seller.$isSellerSignedIn
  }
  
}
