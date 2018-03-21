import { environment } from '../../../environments/environment';
import { ActionReducer, combineReducers, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth.reducer';
import * as fromRoot from '../../shared/store';

export interface AuthState {
  login:          fromAuth.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  login:          fromAuth.reducer,
};


export const selectAuthState   = createFeatureSelector<fromAuth.State>('auth');
export const selectLoginState  = createSelector(selectAuthState, (state: any) => state.login);
export const getAuthLoaded  = createSelector(selectLoginState, fromAuth.getLoaded);
export const getAuthLoading = createSelector(selectLoginState, fromAuth.getLoading);
export const getAuthFailed  = createSelector(selectLoginState, fromAuth.getFailed);
export const getLoggedUser  = createSelector(selectLoginState, fromAuth.getLoggedUser);