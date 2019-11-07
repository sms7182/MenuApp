import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('nameInput',{static:true}) nameInputRef:ElementRef;
 @ViewChild('amountInput',{static:true}) amountInputRef:ElementRef;
 //@Output() ingredientAdded=new EventEmitter<Ingredient>();
  constructor(private shoppingls:ShoppingListService) { }

  ngOnInit() {
  }
  onAddItem(){
    const nameinp=this.nameInputRef.nativeElement.value;
    const amountinp=this.amountInputRef.nativeElement.value;
   const ingredient= new Ingredient(nameinp,amountinp);
   this.shoppingls.addIngredient(ingredient);
  }
}
