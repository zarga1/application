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
import { AuthModule }          from './auth/auth.module';
import { HttpServiceModule }   from './shared/asyncServices/http/http.module';
import { UtilityModule}        from './shared/utility';

// Store
import { reducers, metaReducers }               from './shared/store';

// Guards
import { AuthGuard }           from './shared/guards/auth.guard';
import { CanDeactivateGuard }  from './shared/guards/canDeactivate.guard';

// Services
import { ConfigService }       from './app-config.service';

// Third party libraries
import { StoreModule }         from '@ngrx/store';
import { EffectsModule }       from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
}                              from 'ng2-translate';
import { TranslateService }    from 'ng2-translate';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './shared/utility/router-state-serializer.class';
import { ProductsModule } from './products/products.module';

/**
 * Calling functions or calling new is not supported in metadata when using AoT.
 * The work-around is to introduce an exported function.
 *
 * The reason for this limitation is that the AoT compiler needs to generate the code that calls the factory
 * and there is no way to import a lambda from a module, you can only import an exported symbol.
 */

export function configServiceFactory (config: ConfigService) {
  return () => config.load()
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular core dependencies
    BrowserModule,
    FormsModule,
    HttpModule,

    // Third party modules
    TranslateModule.forRoot(),

    // App custom dependencies
    HttpServiceModule.forRoot(),
    UtilityModule.forRoot(),

    AuthModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers }),

    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'      
    }),

    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: environment.production,
    }),

    EffectsModule.forRoot([]),

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
    },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }