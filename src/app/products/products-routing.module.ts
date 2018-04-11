import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsCollectionComponent } from './components/products-collection/products-collection.component';

const routes: Routes = [{
  path: '', component: ProductsCollectionComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
