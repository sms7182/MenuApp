import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {throwError,  BehaviorSubject} from 'rxjs';
import { User } from './user.model';


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

   user =new BehaviorSubject<User>(null)
 private tokenExpirationTimer:any;
  constructor(private httpclient:HttpClient,private router:Router){

  }
  signUp(email:string,password:string){
   return this.httpclient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcA0G9_Cv1ioccrKeABPT18Kf4ukjxUIk',{
     email:email,
     password:password,
     returnSecureToken:true

   }).pipe(catchError(this.handleError),tap(resData=>{
     this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
   }) )
 }
 login(email:string,password:string){
 return  this.httpclient.post<AuthResponseData >('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcA0G9_Cv1ioccrKeABPT18Kf4ukjxUIk',{
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
  this.user.next(user);
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
    this.user.next(loadedUser);
    const expirationDuration=new Date(userdata._tokenExpirationDate).getTime()-new Date().getTime();
    this.autoLogout(expirationDuration);
  }
}
  logout(){
     this.user.next(null);
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