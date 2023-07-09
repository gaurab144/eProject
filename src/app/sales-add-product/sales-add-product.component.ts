import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { products } from '../data-type';

@Component({
  selector: 'app-sales-add-product',
  templateUrl: './sales-add-product.component.html',
  styleUrls: ['./sales-add-product.component.scss']
})
export class SalesAddProductComponent {

  addProductMessage: string | undefined

  constructor(private _product: ProductService) {}

  addNew(data: products) {
    console.warn(data)
    this._product.addProduct(data).subscribe((result) => {
      console.warn(result)
      if(result){
        this.addProductMessage="product is successfully added"
      }
      setTimeout(() => {
        this.addProductMessage= undefined
      },3000)
    })
  }

}
