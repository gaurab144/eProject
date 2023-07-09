import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { products } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.scss']
})
export class SalesHomeComponent {
  icon= faTrash;
  iconEdit= faEdit;

  productList: undefined | products[];
  deleteMsg: string | undefined

  constructor(private _product: ProductService) {}

  ngOnInit(): void{
    this.List()
  }

  deleteProduct(id: number){
    // console.warn('test id',id)
    this._product.deleteProduct(id).subscribe((res) => {
      if(res){
        this.deleteMsg = 'Product is deleted '
        this.List()
      }
    })
    setTimeout(() => {
      this.deleteMsg= undefined
    }, 3000)
  }

  List(){
    this._product.productList().subscribe((res) => {
      // console.warn(res)
      this.productList = res
    })
  }

}
