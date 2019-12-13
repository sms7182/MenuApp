import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';



import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeWasSelected=new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription:Subscription;
  constructor(
    private recipeservice:RecipeService,
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    
    this.subscription = this.store.select('recipes')
    .pipe(
      map(recipesState=>recipesState.recipes)
    )
    .subscribe(
      (recipes: Recipe[]) => {
        debugger;
        this.recipes = recipes;
      }
    );
    
  
  }
  onNewRecipe(){
   this.router.navigate(['new'],{relativeTo:this.route})
  }

}
