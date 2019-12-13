import {Recipe} from './recipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import {Actions ,ofType} from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as fromApp from '../store/app.reducer'
import * as RecipeActions from '../recipes/store/recipe.actions';
import { take } from 'rxjs/operators';


@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
   constructor(private store:Store<fromApp.AppState>,private actions$:Actions){

   }
   resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    //    return this.dataStorageService.fetchRecipes();
    this.store.dispatch(new RecipeActions.FetchRecipes());  
   return this.actions$.pipe(
       ofType(RecipeActions.SET_RECIPES),
       take(1)
   ); 
   }
}