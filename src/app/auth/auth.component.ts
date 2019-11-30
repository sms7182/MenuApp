import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

import {AlertComponent} from '../shared/alert/alert.component'
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { hostViewClassName } from '@angular/compiler';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
 isLoginMode=true;
 isLoading=false;
 error:string=null;
 @ViewChild(PlaceHolderDirective,{static:false}) alertHost:PlaceHolderDirective;
 private closeSub:Subscription;
 constructor(private authservice:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver){

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
        this.isLoading=true;
        let authObs:Observable<AuthResponseData>;
   if(this.isLoginMode){
      authObs= this.authservice.login(email,password);
   }
   else{
    
        authObs= this.authservice.signUp(email,password);
    }
    authObs.subscribe(rs=>{
        this.isLoading=false;
        console.log(rs);
        this.router.navigate(['/recipes'])
    },errorMessage=>{
            
      this.isLoading=false;
      this.error=errorMessage;
    this.showErrorAlert(errorMessage);
      console.log(errorMessage);
    
    });
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