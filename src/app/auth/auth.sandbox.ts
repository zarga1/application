import { Injectable } 	 from '@angular/core';
import { Router }        from '@angular/router';
import { Store, select }      	 from '@ngrx/store';
import { Subscription }  from "rxjs";
import { Sandbox } 			 from '../shared/sandbox/base.sandbox';
import * as fromAuth     	 from './store';
import * as authActions  from './store/auth.action';
import { User }          from '../shared/models';
import {
  UtilService,
  ValidationService
}                        from '../shared/utility';
import {
  LoginForm,
  RegisterForm
}                        from '../shared/models';

@Injectable()
export class AuthSandbox extends Sandbox {

  public loginLoading$ = this.store.pipe(select(fromAuth.getAuthLoading));
  public loginLoaded$  = this.store.pipe(select(fromAuth.getAuthLoaded));
  public loggedUser$   = this.store.pipe(select(fromAuth.getLoggedUser));

  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    protected store: Store<fromAuth.State>,
    private utilService: UtilService,
    public validationService: ValidationService
  ) {
    super(store);
    this.registerAuthEvents();
  }

  /**
   * Dispatches login action
   *
   * @param form
   */
  public login(form: any): void {
    this.store.dispatch(new authActions.DoLoginAction(new LoginForm(form)));
  }

  /**
   * Dispatches register action
   *
   * @param form
   */
  public register(form: any): void {
    this.store.dispatch(new authActions.DoRegisterAction(new RegisterForm(form)));
  }

  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {
    // Subscribes to login success event and redirects user to home page
    this.subscriptions.push(this.loginLoaded$.subscribe((loaded: boolean) => {
      if (loaded) this.router.navigate(['/products']);
    }));

    // Subscribes to logged user data and save/remove it from the local storage
    this.subscriptions.push(this.loggedUser$.subscribe((user: User) => {
      if (user.isLoggedIn) user.save();
      else                 User.remove();
    }));
  }

  /**
   * Uncapitalize response keys
   *
   * @param user
   */
  static authAdapter(user: any): any {
    return Object.assign({}, user, { email: user.Email});
  }
}