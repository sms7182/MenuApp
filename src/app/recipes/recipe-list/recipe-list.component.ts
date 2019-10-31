import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]=[
    new Recipe('test','test description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF5fjgVl9c88z-4CN26iWaHP2gX7k7QGAotjZsJ13s3O5OctuQg&s'),
    new Recipe('test','test description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF5fjgVl9c88z-4CN26iWaHP2gX7k7QGAotjZsJ13s3O5OctuQg&s')
  ];
  constructor() { }

  ngOnInit() {
  }

}