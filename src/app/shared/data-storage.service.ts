import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Store } from '@ngrx/store';

import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';


import * as fromApp from '../store/app.reducer'
import * as RecipeActions from '../recipes/store/recipe.actions'


@Injectable({providedIn:'root'})   
export class DataStorageService{
constructor(
  private httpclient:HttpClient,
  private recipeService:RecipeService,
  private store:Store<fromApp.AppState>){

}
storeRecipes()
{

 const recipes=  this.recipeService.getRecipes();
    this.httpclient.put('https://ng-course-recipe-book-6b5d4.firebaseio.com/recipes.json',recipes).subscribe(response=>{
        console.log(response);
    });

}
fetchRecipes() {
    
        return this.httpclient.get<Recipe[]>(
          'https://ng-course-recipe-book-6b5d4.firebaseio.com/recipes.json'
         
        ).pipe(
      
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        //this.recipeService.onSetRecipes(recipes);

      })
    );
  }
}