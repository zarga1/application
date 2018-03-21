import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProducts from './store';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', fromProducts.reducers, { metaReducers: fromProducts.metaReducers }),
  ],
  declarations: []
})
export class ProductsModule { }
