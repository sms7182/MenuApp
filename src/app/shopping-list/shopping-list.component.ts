import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
   ingredients:Ingredient[];
   private igChangeSub:Subscription;
  
  constructor(private shoppinglistservice:ShoppingListService) {
    

   }
  
  ngOnInit() {
    this.ingredients=this.shoppinglistservice.getIngredients();
   this.igChangeSub= this.shoppinglistservice.ingredientsChanged.subscribe((ings:Ingredient[])=>{
      this.ingredients=ings;
    })
  }
  onIngredientAdded(ing:Ingredient){
    this.shoppinglistservice.addIngredient(ing);
   
  }
  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
  onEditItem(indx:number){
     this.shoppinglistservice.startedEdititng.next(indx);
  }
}
