import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { products } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  // here this searchResult of products[] type difined in data type interface holds the res from api to show in html
  searchReasult: undefined | products[]

  constructor(private _product: ProductService, private activeRoute: ActivatedRoute) {}

  // here the query value belongs to the path in routing module difined with search path
  ngOnInit(){
    let query= this.activeRoute.snapshot.paramMap.get('query')
    console.warn(query)
    query && this._product.searchProducts(query).subscribe((res) => {
      this.searchReasult = res
    })
  }

}
