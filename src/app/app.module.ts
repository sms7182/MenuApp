import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http'
import{StoreModule} from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HeaderComponent} from './header/header.component';


import {  ReactiveFormsModule } from '@angular/forms';
import {EffectsModule} from '@ngrx/effects'


import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,RecipeEffects]),
   // AuthModule,
    SharedModule ,
    CoreModule
  ],

  bootstrap: [AppComponent],
 // providers:[LoggingService]
  
})
export class AppModule { }
