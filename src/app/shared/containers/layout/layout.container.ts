import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subscription }     from "rxjs";
import { ConfigService }    from '../../../app-config.service';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { Store, select }      	     from '@ngrx/store';
import * as fromRoot      from '../../store';
import * as fromAuth      from '../../../auth/store';
import * as authActions      from '../../../auth/store/auth.action';
import * as settingsActions  from '../../store/settings.action';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  template: `
    <app-header
      (selectLanguage)="selectLanguage($event)"
      (logout)="logout()"
      [selectedLanguage]="selectedLang$ | async"
      [availableLanguages]="availableLanguages$ | async"
      [userImage]="userImage"
      [userEmail]="userEmail">
    </app-header>
    <navigation></navigation>
    <div class="layout-content">
      <ng-content></ng-content>
    </div>
  `
})
export class LayoutContainer {

  public userImage:     string = '';
  public userEmail:     string = '';
  private assetsFolder: string;

  public selectedLang$       = this.store.pipe(select(fromRoot.getSelectedLanguage));
  public availableLanguages$ = this.store.pipe(select(fromRoot.getAvailableLanguages));
  public user$               = this.store.pipe(select(fromAuth.getLoggedUser));
  private loginLoaded$;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private configService: ConfigService,
    protected store: Store<any>,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.assetsFolder = this.configService.get('paths').userImageFolder;
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  private registerEvents() {
    // Subscribes to user changes
    this.subscriptions.push(this.user$.subscribe(user => {
      if (user) {
        this.userImage  = this.assetsFolder + 'user.jpg';
        this.userEmail  = user.email;
      }
    }));
  }
}