import {Component, OnInit, OnDestroy} from '@angular/core'
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import {Store} from '@ngrx/store'

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipeActions from '../recipes/store/recipe.actions'

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
   isAuthenticated=false;
    private userSub:Subscription;
    constructor(private storageService:DataStorageService,private authService:AuthService ,private store:Store<fromApp.AppState>){

    }
    ngOnInit(){
      this.userSub=  this.store.select('auth').pipe(map(authstate=>{
          return authstate.user;
      })).subscribe(user=>{
          this.isAuthenticated=!user?false:true;
          console.log(!user);
          console.log(!!user);
        })
    }
    onSaveData(){
        this.storageService.storeRecipes();
    }
    onFetchData(){
       this.storageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }
    onLogout(){
       this.store.dispatch(new AuthActions.Logout());
        //    this.authService.logout();
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
 
}