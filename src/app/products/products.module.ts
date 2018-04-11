import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsCollectionComponent } from './components/products-collection/products-collection.component';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './store/products.state';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxsModule.forFeature([ProductsState])
  ],
  declarations: [ProductsCollectionComponent]
})
export class ProductsModule { }
