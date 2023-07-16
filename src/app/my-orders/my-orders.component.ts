import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  orderData: order[] | undefined

  constructor(private _product: ProductService) {}

  ngOnInit(): void{
    this.getOrderList()
  }

  cancelOrder(orderId:number|undefined){
    orderId && this._product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }

  getOrderList() {
    this._product.orderList().subscribe((res) => {
      this.orderData = res
    })
  }

}
