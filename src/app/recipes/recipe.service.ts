import { Recipe } from './recipe.model';
import { EventEmitter, Output, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

   @Output() recipeSelected=new EventEmitter<Recipe>();
   private recipes: Recipe[]=[
        new Recipe('test','test description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF5fjgVl9c88z-4CN26iWaHP2gX7k7QGAotjZsJ13s3O5OctuQg&s',[new Ingredient('meat',1),new Ingredient('french frises',5)]),
        new Recipe('another test','test description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF5fjgVl9c88z-4CN26iWaHP2gX7k7QGAotjZsJ13s3O5OctuQg&s',[new Ingredient('bread',1),new Ingredient('egg',5)])
      ];
      constructor(private shpls:ShoppingListService){

      }
      getRecipes(){
          return this.recipes.slice();
      }
      addIngredientsToShoppingList(ings:Ingredient[]){
    
       this.shpls.addIngredients(ings);
      }
}