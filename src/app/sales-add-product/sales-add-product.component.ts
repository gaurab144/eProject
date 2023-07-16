import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { products } from '../data-type';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sales-add-product',
  templateUrl: './sales-add-product.component.html',
  styleUrls: ['./sales-add-product.component.scss']
})
export class SalesAddProductComponent {
  // viewChild is used for DOM manipulation for the NgForm
  @ViewChild('addProduct', { static: false }) addProductForm!: NgForm;

  addProductMessage: string | undefined

  constructor(private _product: ProductService) {}

  addNew(data: products) {
    console.warn(data)
    this._product.addProduct(data).subscribe((result) => {
      console.warn(result)
      if(result){
        this.addProductMessage="product is successfully added"
        this.addProductForm.resetForm()
      }
      setTimeout(() => {
        this.addProductMessage= undefined
      },3000)

    })

  }

}
