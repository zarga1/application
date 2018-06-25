import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { StoreModule } from '@ngrx/store';
import { ProductsComponent } from './products-master.component';
import { ProductsListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { MaterialCdkModule } from '../shared/utility/material-cdk.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    MaterialCdkModule
  ],
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductDetailComponent
  ]
})
export class ProductsModule { }
