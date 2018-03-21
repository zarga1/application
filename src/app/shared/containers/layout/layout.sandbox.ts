import { Injectable } 	     from '@angular/core';
import { Router }            from '@angular/router';
import { Sandbox } 			     from '../../sandbox/base.sandbox';
import { Store, select }      	     from '@ngrx/store';
import * as fromRoot      from '../../store';
import * as fromAuth      from '../../../auth/store';
import * as authActions      from '../../../auth/store/auth.action';
import * as settingsActions  from '../../store/settings.action';
import { TranslateService }  from 'ng2-translate';

@Injectable()
export class LayoutSandbox extends Sandbox {

  public selectedLang$       = this.store.pipe(select(fromRoot.getSelectedLanguage));
  public availableLanguages$ = this.store.pipe(select(fromRoot.getAvailableLanguages));
  public user$               = this.store.pipe(select(fromAuth.getLoggedUser));
  private loginLoaded$;

  constructor(
    protected store: Store<any>,
    private translateService: TranslateService,
    private router: Router
  ) {
  	super(store);
  }

  public selectLanguage(lang: any): void {
    this.store.dispatch(new settingsActions.SetLanguageAction(lang.code));
    this.store.dispatch(new settingsActions.SetCultureAction(lang.culture));
    this.translateService.use(lang.code);
  }

  public logout() {
    this.store.dispatch(new authActions.DoLogoutAction());
    this.subscribeToLoginChanges();
  }

  private subscribeToLoginChanges() {
    if (this.loginLoaded$) return;

    this.loginLoaded$ = this.store.pipe(select(fromAuth.getAuthLoaded))
    .subscribe(loaded => {
      if (!loaded) this.router.navigate(['/login'])
    });
  }
}