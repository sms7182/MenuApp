import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import{NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store'; 


import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer'
import * as fromApp from '../../store/app.reducer'


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
@ViewChild('f',{static:false}) slform:NgForm;
 subscription:Subscription;
 editMode=false;
 //editedItemIndex:number;
 editedItem:Ingredient;
  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
  this.subscription=this.store.select('shoppingList').subscribe(stateData=>{
    if(stateData.editedIngredientIndex>-1){
           this.editMode=true;
           this.editedItem=stateData.editedIngredient;
           //this.editedItemIndex=stateData.editedIngredientIndex;
           this.slform.setValue({name:this.editedItem.name,
            amount:this.editedItem.amount})
    }
    else{
      this.editMode=false;
    }
  })
  //  this.subscription= this.shoppingls.startedEdititng.subscribe((indx:number)=>{
  //   this.editedItemIndex=indx;  
  //   this.editMode=true;
    
  //   this.editedItem=this.shoppingls.getIngreditent(indx);
  //   console.log(this.editedItem);
    
  //  });
  }
  onSubmit(form:NgForm){
    
    const value=form.value;
   const ingredient= new Ingredient(value.name,value.amount );
   if(this.editMode){
     this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient))
    //  this.shoppingls.updateIngredient(ingredient,this.editedItemIndex);
   }
   else{
    //this.shoppingls.addIngredient(ingredient);
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
   }
   this.editMode=false;
   form.reset();
   
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onClear(){
    this.editMode=false;
    this.slform.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    // this.shoppingls.deleteIngredient(this.editedItemIndex);
   this.onClear();
  }
}
