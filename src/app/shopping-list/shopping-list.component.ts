import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import{Store} from '@ngrx/store' ;

import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';




@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
   ingredients:Observable<{ingredients:Ingredient[]}> ;
   private igChangeSub:Subscription;
  
  constructor(private shoppinglistservice:ShoppingListService,private loggingService:LoggingService,private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) {
    

   }
  
  ngOnInit() {
   this.ingredients= this.store.select('shoppingList');
  //   this.ingredients=this.shoppinglistservice.getIngredients();
  //  this.igChangeSub= this.shoppinglistservice.ingredientsChanged.subscribe((ings:Ingredient[])=>{
  //     this.ingredients=ings;
  //   })
   this.loggingService.printLog('Hello from shoppingListComponent')
  }
  onIngredientAdded(ing:Ingredient){
    this.shoppinglistservice.addIngredient(ing);
   
  }
  ngOnDestroy(){
   // this.igChangeSub.unsubscribe();
  }
  onEditItem(indx:number){
     this.shoppinglistservice.startedEdititng.next(indx);
  }
}
