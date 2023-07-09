import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { products } from '../data-type';

@Component({
  selector: 'app-sales-update-products',
  templateUrl: './sales-update-products.component.html',
  styleUrls: ['./sales-update-products.component.scss']
})
export class SalesUpdateProductsComponent implements OnInit{
  productData: undefined | products
  updateMsg: undefined | string
 
  //concept of activated route for populating the data 
  constructor(private route: ActivatedRoute, private _product: ProductService) {}

  ngOnInit(): void{
    let productId= this.route.snapshot.paramMap.get('id')
    productId && this._product.getProduct(productId).subscribe((res) => {
      console.warn(res)
      this.productData = res
    })
    }
 //error Http response not found products/undefined
 submit(data: products) {
   console.warn(data)
   //forcefully pushing the id of data to updated product.id since it doesnot have id
    if(this.productData){
      data.id = this.productData.id
    }
    this._product.updateProduct(data).subscribe((res) => {
      if(res){
        this.updateMsg='product is updated'
      }
    })
    setTimeout(() => {
      this.updateMsg= undefined
    }, 3000);
  }

}
