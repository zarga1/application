import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './products.state';

import { ProductsCollectionComponent } from './products-collection.component';
import { ProductComponent } from './product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsFormPluginModule.forRoot(),
    NgxsModule.forFeature([ProductsState]),
  ],
  declarations: [ProductsCollectionComponent, ProductComponent]
})
export class ProductsModule { }
