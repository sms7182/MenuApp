import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn:'root'})   
export class DataStorageService{
constructor(private httpclient:HttpClient,private recipeService:RecipeService){

}
storeRecipes()
{
    debugger;
 const recipes=  this.recipeService.getRecipes();
    this.httpclient.put('https://ng-course-recipe-book-6b5d4.firebaseio.com/recipes.json',recipes).subscribe(response=>{
        console.log(response);
    });

}
fetchRecipes(){
    this.httpclient.get<Recipe[]>('https://ng-course-recipe-book-6b5d4.firebaseio.com/recipes.json').subscribe(recipes=>{
      
        this.recipeService.onSetRecipes(recipes);
    });
}
}