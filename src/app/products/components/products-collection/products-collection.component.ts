import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductsStateModel } from '../../store/products.state';

@Component({
  selector: 'app-products-collection',
  templateUrl: './products-collection.component.html',
  styleUrls: ['./products-collection.component.css']
})
export class ProductsCollectionComponent implements OnInit {

  @Select((state) => state.products.cars)
  cars$;

  selectedCars = [];

  constructor() {}

  ngOnInit() {
  }

}
