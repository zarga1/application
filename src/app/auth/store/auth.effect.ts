import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable }       from '@angular/core';
import { Effect, Actions }  from '@ngrx/effects';
import { Action }           from '@ngrx/store';
import { Observable }       from 'rxjs/Observable';
import { of }               from 'rxjs/observable/of';
import * as actions         from './auth.action';
import * as fromAuth         from './auth.reducer';
import { Store }            from '@ngrx/store';
import { User } from '../../shared/models/index';
import { AuthApiClient } from '../authApiClient.service';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authApiClient: AuthApiClient,
    private appState$: Store<fromAuth.State>) {}

  /**
   * Login effect
   */
  @Effect()
  doLogin$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DO_LOGIN)
    .map((action: actions.DoLoginAction) => action.payload)
    .switchMap(state => {
      return this.fakeLogin(state)
        .map(user    => new actions.DoLoginSuccessAction(new User(user)))
        .catch(error => of(new actions.DoLoginFailAction()));
    });

  /**
   * Registers effect
   */
  @Effect()
  doRegister$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DO_REGISTER)
    .map((action: actions.DoRegisterAction) => action.payload)
    .switchMap(state => {
      return this.fakeRegister(state)
        .map(user    => new actions.DoRegisterSuccessAction(new User(user)))
        .catch(error => of(new actions.DoRegisterFailAction()));
    });

  /**
   * Logout effect
   */
  @Effect()
  doLogout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DO_LOGOUT)
    .map((action: actions.DoLogoutAction) => null)
    .switchMap(state => {
      return this.fakeLogout()
        .map(()      => new actions.DoLogoutSuccessAction())
        .catch(error => of(new actions.DoLogoutFailAction()));
    });

    fakeRegister(state): Observable<any>{
      return new Observable(observer => {
        let user: User = new User(state);
        user.add();
        observer.next(user);
      })
    }
  
    fakeLogin(state): Observable<any>{
      return new Observable(observer => {
        let user: User = new User(state);
        if(user.exist()) {
          let users: Array<User> = JSON.parse(localStorage.getItem('users'));
          let userToBeLoaded = users.find(usr => usr.email.localeCompare(user.email)==0);
          return observer.next(userToBeLoaded);
        }
      })
    }
  
    fakeLogout(): Observable<any>{
      return new Observable(observer => {
        User.remove();
        return observer.next({});
      })
    }
}