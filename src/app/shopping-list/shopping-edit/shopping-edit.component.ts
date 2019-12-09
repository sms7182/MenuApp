import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import{NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store'; 


import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';




@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
@ViewChild('f',{static:false}) slform:NgForm;
 subscription:Subscription;
 editMode=false;
 editedItemIndex:number;
 editedItem:Ingredient;
  constructor(private shoppingls:ShoppingListService,private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit() {

   this.subscription= this.shoppingls.startedEdititng.subscribe((indx:number)=>{
    this.editedItemIndex=indx;  
    this.editMode=true;
    
    this.editedItem=this.shoppingls.getIngreditent(indx);
    console.log(this.editedItem);
    this.slform.setValue({name:this.editedItem.name,
    amount:this.editedItem.amount})
   });
  }
  onSubmit(form:NgForm){
    
    const value=form.value;
   const ingredient= new Ingredient(value.name,value.amount );
   if(this.editMode){
     this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editedItemIndex,ingredient:ingredient}))
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
  }
  onClear(){
    this.editMode=false;
    this.slform.reset();
  }
  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    // this.shoppingls.deleteIngredient(this.editedItemIndex);
   this.onClear();
  }
}
