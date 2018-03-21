import { Injectable } 	    from '@angular/core';
import { Store, select }            from '@ngrx/store';
import { Observable }       from 'rxjs/Observable';
import * as fromRoot           from '../store';
import * as fromAuth           from '../../auth/store';
import * as authActions     from '../../auth/store/auth.action';
import { User }             from '../models';
import { localeDateString } from '../utility';

export abstract class Sandbox {

  public loggedUser$: Observable<any> = this.store.pipe(select(fromAuth.getLoggedUser));
  public culture$:    Observable<any> = this.store.pipe(select(fromRoot.getSelectedCulture));
  public culture:     string;

  constructor(protected store: Store<any>) {}

  /**
   * Pulls user from local storage and saves it to the store
   */
  public loadUser(): void {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.store.dispatch(new authActions.AddUserAction(new User(user)));
  }

  /**
   * Formats date string based on selected culture
   * 
   * @param value
   */
  public formatDate(value: string) {
    return localeDateString(value, this.culture);
  }
}