import { Component, Input } from '@angular/core';
import { productsData } from '../data-type';
import { NewProductsService } from '../shared/new-products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {


  public products!: productsData[];
item: any;
  constructor(private _newService: NewProductsService) {}

  ngOnInit(): void {
      this._newService.getNewProducts().subscribe((res) => {
        this.products = res
        console.warn(res);
      })
  }

}
