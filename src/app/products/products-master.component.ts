import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { EntityServices } from 'ngrx-data';
import { MasterDetailCommands } from '../shared/utility/master-detail-component.class';
import { Product } from '../shared/models';
import { ProductsService } from './products.service';
import { AppEntityServices } from '../shared/store/entity/app-entities.service';


@Component({
  selector: 'app-products',
  template: `
  <div class="control-panel">
    <div class="button-panel">
      <button mat-raised-button color="primary" type="button" (click)="loadProducts()" matTooltip="Refresh the products">Refresh</button>
      <button mat-raised-button color="primary" type="button" (click)="enableAddMode()" *ngIf="!selectedProduct" matTooltip="Add a new product">Add</button>
    </div>
  </div>
  <div class="content-container">
    <div class="list-container">
      <div *ngIf="productsCollection$ | async as products">
        <span *ngIf="loading$ | async;else productsList" mode="indeterminate" color="accent"> Loading...</span>
        <ng-template #productsList>
          <app-products-list [products]="products" [selectedProduct]="selectedProduct" [commands]="commands"></app-products-list>
        </ng-template>
      </div>
    </div>
    <div class="detail-container">
      <app-product-detail *ngIf="selectedProduct" [product]="selectedProduct" [commands]="commands">
      </app-product-detail>
    </div>
  </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent
  implements MasterDetailCommands<any> {

  commands = this;
  selectedProduct: any;
  subscription: Subscription;
  loading$: Observable<boolean>;
  productsCollection$: Observable<any>;

  private productsService: ProductsService;

  constructor(appEntityServices: AppEntityServices) {

    this.productsService = appEntityServices.productsService;
    this.loading$ = this.productsService.loading$;
    this.productsCollection$ = this.productsService.collection$;
  }

  close() {
    this.selectedProduct = null;
  }

  enableAddMode() {
    this.selectedProduct = <any>{};
  }

  loadProducts() {
    this.productsService.getAll();
    this.close();
  }

  add(product: any) {
    this.productsService.add(product);
  }

  delete(product: any) {
    this.close();
    this.productsService.delete(product);
  }

  select(product: any) {
    this.selectedProduct = product;
  }

  update(product: any) {
    this.productsService.update(product);
  }
}
