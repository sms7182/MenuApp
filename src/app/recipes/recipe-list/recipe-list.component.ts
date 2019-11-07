import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeWasSelected=new EventEmitter<Recipe>();
  recipes: Recipe[];
  constructor(private recipeservice:RecipeService) { }

  ngOnInit() {
    this.recipes=this.recipeservice.getRecipes();
  }
  // onRecipeSelect(rec:Recipe){
  //   this.recipeWasSelected.emit(rec);
  // }

}
