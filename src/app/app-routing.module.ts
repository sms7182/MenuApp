import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';



const routes: Routes = [
  { path: '',  redirectTo: '/recipes', pathMatch: 'full' },
  {path:'recipes',loadChildren:'./recipes/recipes.modules#RecipesModules'},
  {path:'shopping-list',loadChildren:'./shopping-list/shopping.module#ShoppingModule'},
  {path:'auth',loadChildren:'./auth/auth.module#AuthModule'}
  
 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
