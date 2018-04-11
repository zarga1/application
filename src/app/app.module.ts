// Angular core modules
import { BrowserModule }       from '@angular/platform-browser';
import {
  NgModule,
  APP_INITIALIZER
}                              from '@angular/core';
import { FormsModule }         from '@angular/forms';
import { 
  HttpModule,
  RequestOptions,
  XHRBackend,
  Http
}                              from '@angular/http';
import { Router }              from '@angular/router';

// Routes
import { AppRoutingModule }    from './app-routing.module';

// Modules
import { AppComponent }        from './app.component';
import { HttpServiceModule }   from './shared/asyncServices/http/http.module';
import { UtilityModule}        from './shared/utility';

// Store

// Guards
import { AuthGuard }           from './shared/guards/auth.guard';
import { CanDeactivateGuard }  from './shared/guards/canDeactivate.guard';

// Services
import { ConfigService }       from './app-config.service';

import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
}                              from 'ng2-translate';
import { TranslateService }    from 'ng2-translate';
import { environment } from '../environments/environment';
import { ContainersModule } from './shared/containers';
import { ProductsModule } from './products/products.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppState } from './shared/store/app.state';
import { RouterState } from './shared/store/router.state';

export function configServiceFactory (config: ConfigService) {
  return () => config.load()
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgxsModule.forRoot([AppState, RouterState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    HttpServiceModule.forRoot(),
    UtilityModule.forRoot(),
    ContainersModule,
    AppRoutingModule,

    ProductsModule,
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService], 
      multi: true
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }