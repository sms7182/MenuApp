import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http'
import{StoreModule} from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HeaderComponent} from './header/header.component';


import {  ReactiveFormsModule } from '@angular/forms';



import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


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
  
    StoreModule.forRoot({shoppingList:shoppingListReducer}),
   // AuthModule,
    SharedModule ,
    CoreModule
  ],

  bootstrap: [AppComponent],
 // providers:[LoggingService]
  
})
export class AppModule { }
