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
    TranslateModule.forRoot(),
    
    // App custom dependencies
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