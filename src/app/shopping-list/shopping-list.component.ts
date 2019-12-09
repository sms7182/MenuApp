import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import{Store} from '@ngrx/store' ;

import {Ingredient} from '../shared/ingredient.model';

import { LoggingService } from '../logging.service';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
   ingredients:Observable<{ingredients:Ingredient[]}> ;
   private igChangeSub:Subscription;
  
  constructor(private loggingService:LoggingService,private store:Store<fromShoppingList.AppState>) {
    

   }
  
  ngOnInit() {
   this.ingredients= this.store.select('shoppingList');
  //   this.ingredients=this.shoppinglistservice.getIngredients();
  //  this.igChangeSub= this.shoppinglistservice.ingredientsChanged.subscribe((ings:Ingredient[])=>{
  //     this.ingredients=ings;
  //   })
   this.loggingService.printLog('Hello from shoppingListComponent')
  }
  // onIngredientAdded(ing:Ingredient){
  //   this.shoppinglistservice.addIngredient(ing);
   
  // }
  ngOnDestroy(){
   // this.igChangeSub.unsubscribe();
  }
  onEditItem(indx:number){
   //  this.shoppinglistservice.startedEdititng.next(indx);
   this.store.dispatch(new ShoppingListActions.StartEdit(indx));
  }
}
