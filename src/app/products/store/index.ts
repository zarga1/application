import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProduct from './product.reducer';

export interface State {

  product: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {

  product: fromProduct.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
