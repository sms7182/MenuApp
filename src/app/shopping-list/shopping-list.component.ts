import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
   ingredients:Ingredient[];
  
  constructor(private shoppinglistservice:ShoppingListService) {
    

   }
  
  ngOnInit() {
    this.ingredients=this.shoppinglistservice.getIngredients();
    this.shoppinglistservice.ingredientsChanged.subscribe((ings:Ingredient[])=>{
      this.ingredients=ings;
    })
  }
  onIngredientAdded(ing:Ingredient){
    this.shoppinglistservice.addIngredient(ing);
   
  }
}
