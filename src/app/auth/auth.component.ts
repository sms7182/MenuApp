import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

import {AlertComponent} from '../shared/alert/alert.component'
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp  from '../store/app.reducer'
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions'

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
 isLoginMode=true;
 isLoading=false;
 error:string=null;
 @ViewChild(PlaceHolderDirective,{static:false}) alertHost:PlaceHolderDirective;
 private closeSub:Subscription;
 constructor(private authservice:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver,private store:Store<fromApp.AppState>){

 }
 ngOnInit(){
    this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.loading; 
      this.error=authState.authError;
      if(this.error){
          this.showErrorAlert(this.error);
      }  
    })
 }
 onSwitchMode(){
     this.isLoginMode=!this.isLoginMode;
 }
 onSubmit(form:NgForm){
     if(!form.valid)
     {
         return;
        }
        const email=form.value.email;
        const password=form.value.password;
     //   this.isLoading=true;
       // let authObs:Observable<AuthResponseData>;
   if(this.isLoginMode){
    this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}));
    //  authObs= this.authservice.login(email,password);
   }
   else{
    this.store.dispatch(new AuthActions.SignUpStart({email:email,password:password}))
        // authObs= this.authservice.signUp(email,password);
    }
   
    // authObs.subscribe(rs=>{
    //     this.isLoading=false;
    //     console.log(rs);
    //     this.router.navigate(['/recipes'])
    // },errorMessage=>{
            
    //   this.isLoading=false;
    //   this.error=errorMessage;
    // this.showErrorAlert(errorMessage);
    //   console.log(errorMessage);
    
    // });
   form.reset();
 }
 onHandleError(){
     this.error=null;
 }
 private showErrorAlert(message:string){
  const alertComponentFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
  
   const hostViewContainerRef=this.alertHost.viewContainerRef;
   hostViewContainerRef.clear();
  const componentRef= hostViewContainerRef.createComponent(alertComponentFactory);
  componentRef.instance.message=message; 
  this.closeSub=componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear(); 

  })
 }
 ngOnDestroy(){
     if(this.closeSub){
     this.closeSub.unsubscribe();
    }
 }

}