import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent {
  loadedfeatuer='recipe';
  onNavigate(nav:string){
   
     this.loadedfeatuer=nav;
  }
}
