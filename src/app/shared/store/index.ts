import { createSelector } from 'reselect';

/**
 * More info: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { ActionReducer, combineReducers } from '@ngrx/store';

/**
 * More info: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromSettings        from './reducers/settings.reducer';
import * as fromAuth            from './reducers/auth.reducer';

/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  settings:       fromSettings.State;
  login:          fromAuth.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  settings:       fromSettings.reducer,
  login:          fromAuth.reducer,
};

export function store(state: any, action: any) {
  const store: ActionReducer<State> = compose(combineReducers)(reducers);
  return store(state, action);
}

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 */

/**
 * Settings store functions
 */
export const getSettingsState      = (state: State) => state.settings;
export const getSelectedLanguage   = createSelector(getSettingsState, fromSettings.getSelectedLanguage);
export const getSelectedCulture    = createSelector(getSettingsState, fromSettings.getSelectedCulture);
export const getAvailableLanguages = createSelector(getSettingsState, fromSettings.getAvailableLanguages);

/**
 * Auth store functions
 */
export const getAuthState   = (state: State) => state.login;
export const getAuthLoaded  = createSelector(getAuthState, fromAuth.getLoaded);
export const getAuthLoading = createSelector(getAuthState, fromAuth.getLoading);
export const getAuthFailed  = createSelector(getAuthState, fromAuth.getFailed);
export const getLoggedUser  = createSelector(getAuthState, fromAuth.getLoggedUser);