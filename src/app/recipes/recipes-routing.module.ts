import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth-guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes:Routes=[
    {
      path:'recipes',component:RecipesComponent,canActivate:[AuthGuard],
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent},
   {path:':id/edit',component:RecipeEditComponent}
         ]
},
]
@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]})
export class RecipesRoutingModule{

}