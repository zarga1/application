import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ProductActions, ProductActionTypes } from './product.actions';

@Injectable()
export class ProductEffects {

  @Effect()
  effect$ = this.actions$.ofType(ProductActionTypes.ProductAction);

  constructor(private actions$: Actions) {}
}
