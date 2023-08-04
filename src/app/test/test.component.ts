import { Component, OnInit } from '@angular/core';
import { faCartShopping,faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent{

  cart= faCartShopping
  heart= faHeart
  search= faSearch

  ngOnInit(): void {

  }

}
