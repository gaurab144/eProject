import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { products } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // carousel 
  popularProduct: products[] | undefined
  trendyProducts: products[] | undefined


  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this._product.popularProducts().subscribe((res) => {
      // console.warn(res)
      this.popularProduct = res
    })

    this._product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data
    })
  }

}
