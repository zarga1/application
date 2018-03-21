import { ActionReducer, combineReducers, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromSettings        from './settings.reducer';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import { RouterStateUrl } from '../utility/router-state-serializer.class';

export interface State {
  settings:       fromSettings.State;
  router:         fromRouter.RouterReducerState<RouterStateUrl>;  
}

export const reducers: ActionReducerMap<State> = {
  settings:       fromSettings.reducer,
  router:         fromRouter.routerReducer,  
};

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger, storeFreeze]
: [];

/**
 * Settings store functions
 */
export const selectSettingsState      = createFeatureSelector<fromSettings.State>('settings');
export const getSelectedLanguage   = createSelector(selectSettingsState, fromSettings.getSelectedLanguage);
export const getSelectedCulture    = createSelector(selectSettingsState, fromSettings.getSelectedCulture);
export const getAvailableLanguages = createSelector(selectSettingsState, fromSettings.getAvailableLanguages);