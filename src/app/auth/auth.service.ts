import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {throwError,  BehaviorSubject} from 'rxjs';
import { Store } from '@ngrx/store';

import {environment} from '../../environments/environment'
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';



export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean

}

@Injectable({providedIn:'root'})
export class AuthService{

 //  user =new BehaviorSubject<User>(null)
 private tokenExpirationTimer:any;
  constructor(private httpclient:HttpClient,private router:Router,private store:Store<fromApp.AppState>){
 
  }
  signUp(email:string,password:string){
   return this.httpclient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,{
     email:email,
     password:password,
     returnSecureToken:true

   }).pipe(catchError(this.handleError),tap(resData=>{
     this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
   }) )
 }
 login(email:string,password:string){
 return  this.httpclient.post<AuthResponseData >('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,{
     email:email,
     password:password,
     returnSecureToken:true
   }).pipe(catchError(this.handleError),tap(resData=>{
     
    this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
  }) );
 }

private handleAuthentication(email:string,userid:string,token:string,expiresln:number){
   const expirationDate=new Date(new Date().getTime()+ expiresln*1000);
  const user=new User(email,userid,token ,expirationDate);
  //this.user.next(user);
  this.store.dispatch(new AuthActions.Login({email:user.email,userId:user.id,token:user.token,expirationDate:expirationDate}))
  this.autoLogout(expiresln*1000);
  localStorage.setItem('userData',JSON.stringify(user));
}

 handleError(errorresp:HttpErrorResponse){
  let errorMessage='An unknown error occured!'
  if(!errorresp.error||!errorresp.error.error){
    return throwError(errorMessage);
  }
  switch(errorresp.error.error.message){
    case 'EMAIL_EXISTS':
      errorMessage='This email exists already'
    case 'INVALID_PASSWORD':
      errorMessage='Password is invalid'
    case 'EMAIL_NOT_FOUND':
      errorMessage='this email does not  exists'
      break;
 }
 return throwError(errorMessage);  
 
 }
autoLogin(){
 
  const userdata:{
    email:string;
    id:string;
    _token:string;
    _tokenExpirationDate:Date

  }=JSON.parse(localStorage.getItem('userData'));
  if(!userdata){
    return ;
  }
  const loadedUser=new User(userdata.email,userdata.id,userdata._token,new Date(userdata._tokenExpirationDate));
  if(loadedUser.token){
  //  this.user.next(loadedUser);
  this.store.dispatch(new AuthActions.Login({email:loadedUser.email,userId:loadedUser.id,token:loadedUser.token,expirationDate:new Date(userdata._tokenExpirationDate)} ))  
  const expirationDuration=new Date(userdata._tokenExpirationDate).getTime()-new Date().getTime();
    this.autoLogout(expirationDuration);
  }
}
  logout(){
     //this.user.next(null);
     this.store.dispatch(new AuthActions.Logout());
     this.router.navigate(['/auth']);
     localStorage.removeItem('userData');
     if(this.tokenExpirationTimer){
       clearTimeout(this.tokenExpirationTimer);
     }
     this.tokenExpirationTimer=null;
 }
 autoLogout(expirationDuration:number){
   this.tokenExpirationTimer=setTimeout(() => {
     this.logout();
   }, expirationDuration);
 }
}