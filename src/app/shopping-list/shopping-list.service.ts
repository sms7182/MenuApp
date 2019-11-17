import { Subject } from 'rxjs';


import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    private ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ];

      addIngredient(ing:Ingredient){
          this.ingredients.push(ing);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      getIngredients(){
          return this.ingredients.slice();
          
      }
      addIngredients(ingrs:Ingredient[]){
          this.ingredients.push(...ingrs);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}