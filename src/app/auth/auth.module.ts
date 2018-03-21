import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
}                                    from '@angular/forms';
import { AuthRoutingModule }         from './auth-routing.module';
import { RegisterComponent }         from './register/register.component';
import { LoginComponent }            from './login/login.component';
import { ComponentsModule }          from '../shared/components';
import { TranslateModule }           from 'ng2-translate';
import { AuthSandbox }               from './auth.sandbox';
import { AuthApiClient }             from './authApiClient.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/index';
import { AuthEffects } from './store/auth.effect';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule,
    
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    AuthApiClient,
    AuthSandbox
  ]
})
export class AuthModule {}
