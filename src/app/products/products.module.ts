import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsCollectionComponent } from './components/products-collection/products-collection.component';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './store/products.state';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    NgxsModule.forFeature([ProductsState])
  ],
  declarations: [ProductsCollectionComponent]
})
export class ProductsModule { }
