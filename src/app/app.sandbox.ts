import { Injectable }    		from '@angular/core';
import { Sandbox }       		from './shared/sandbox/base.sandbox';
import { Store, select }         		from '@ngrx/store';
import * as fromRoot        		from './shared/store';
import * as settingsActions from './shared/store/settings.action';
import { TranslateService } from 'ng2-translate';
import { ConfigService }    from './app-config.service';

@Injectable()
export class AppSandbox extends Sandbox {

  constructor(
  	protected store: Store<fromRoot.State>,
  	private translate: TranslateService,
  	private configService: ConfigService
  ) {
    super(store);
  }

  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {
    let localization: any        = this.configService.get('localization');
    let languages: Array<string> = localization.languages.map(lang => lang.code);
    let browserLang: string      = this.translate.getBrowserLang();

    this.translate.addLangs(languages);
    this.translate.setDefaultLang(localization.defaultLanguage);

    let selectedLang    = browserLang.match(/en|hr/) ? browserLang : localization.defaultLanguage;
    let selectedCulture = localization.languages.filter(lang => lang.code === selectedLang)[0].culture;

    this.translate.use(selectedLang);
    this.store.dispatch(new settingsActions.SetLanguageAction(selectedLang));
    this.store.dispatch(new settingsActions.SetCultureAction(selectedCulture));
  }

  /**
   * Returns global notification options
   */
  public getNotificationOptions(): any {
  	return this.configService.get('notifications').options;
  }
}