import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  ProductAction = '[Product] Action'
}

export class Product implements Action {
  readonly type = ProductActionTypes.ProductAction;
}

export type ProductActions = Product;
