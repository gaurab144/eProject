import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor (private route: Router) {}

  menuType: string =''

  sellerName: string =''

  ngOnInit(): void{
    this.route.events.subscribe((val: any) => {
      if(val.url){
        // console.warn(val.url)
        // for changing the navbar according to seller-user and home [menuType value checks if the navbar for seller and default]
        if(localStorage.getItem('seller') && val.url.includes('sales-home')){
          console.warn('inside seller area')
          this.menuType='seller'
          if(localStorage.getItem('seller')){
            let store= localStorage.getItem('seller') // here the localstorage value is store in Json string formate
            let sData= store && JSON.parse(store)[0]
            this.sellerName = sData.name 
          }
        }else{
          console.warn('outside seller area')
          this.menuType='default'
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate([''])
  }

}
