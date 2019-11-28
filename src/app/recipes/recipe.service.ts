import {  Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';


import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';



@Injectable({providedIn:'root'})
export class RecipeService{
    recipesChanged=new Subject<Recipe[]>();
  
   private recipes: Recipe[]=[
        new Recipe('test','test description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF5fjgVl9c88z-4CN26iWaHP2gX7k7QGAotjZsJ13s3O5OctuQg&s',[new Ingredient('meat',1),new Ingredient('french frises',5)]),
        new Recipe('another test','test description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF5fjgVl9c88z-4CN26iWaHP2gX7k7QGAotjZsJ13s3O5OctuQg&s',[new Ingredient('bread',1),new Ingredient('egg',5)])
      ];
 // private recipes:Recipe[]=[];
      constructor(private shpls:ShoppingListService){

      }

      onSetRecipes(recipes:Recipe[]){
        
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice())
      }
      getRecipes(){
        debugger;
          return this.recipes.slice();
      }
      getRecipe(id:number){
        return this.recipes[id];
      }
      addIngredientsToShoppingList(ings:Ingredient[]){
    
       this.shpls.addIngredients(ings);
      }
      addRecipe(recipe:Recipe){
      
        debugger;
           this.recipes.push(recipe);
           this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
             this.recipes[index]=newRecipe;
             this.recipesChanged.next(this.recipes.slice());
      }
      
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}