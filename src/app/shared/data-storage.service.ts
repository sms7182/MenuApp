import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})   
export class DataStorageService{
constructor(private httpclient:HttpClient,private recipeService:RecipeService,private authService:AuthService){

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
          'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
         
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
        this.recipeService.onSetRecipes(recipes);
      })
    );
  }
}