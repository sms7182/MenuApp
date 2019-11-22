import { Subject } from 'rxjs';


import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startedEdititng=new Subject<Number>();
    private ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ];

      addIngredient(ing:Ingredient){
          this.ingredients.push(ing);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      updateIngredient(ing:Ingredient,indx:number){
          this.ingredients[indx]=ing;
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      getIngredients(){
          return this.ingredients.slice();
          
      }
      getIngreditent(index:number){
        
          return this.ingredients[index];    
      }
      addIngredients(ingrs:Ingredient[]){
          this.ingredients.push(...ingrs);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      deleteIngredient(index:number){
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}