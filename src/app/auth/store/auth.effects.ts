import {Actions, ofType, Effect} from '@ngrx/effects'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, catchError,map, tap, switchMapTo } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import {environment} from '../../../environments/environment.prod'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';





export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean
  
  }

const handleAuthentication=(expiresIn:number,email:string,userId:string,token:string)=>{
  const expirationDate=new Date(new Date().getTime()+ expiresIn*1000);
  return new AuthActions.AuthenticateSuccess({email:email,userId:userId,token:token,expirationDate:expirationDate});
}
const handleError=(errorresp:any)=>{
  let errorMessage='An unknown error occured!'
  if(!errorresp.error||!errorresp.error.error){
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
return of(new AuthActions.AuthenticateFail(errorMessage));
};
@Injectable()
export class AuthEffects{
    
    @Effect()
    authSignup=this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction:AuthActions.SignUpStart)=>{
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,{
          email:signupAction.payload.email,
          password:signupAction.payload.password,
          returnSecureToken:true
     
        }).pipe(

          map(resData=>{
            return  handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken)
             }),
             catchError(errorresp=>{
             return handleError(errorresp);
         })
         );
         
      })
    );
    
    @Effect()
    authLogin=this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.LoginStart)=>{
            return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,{
     email:authData.payload.email,
     password:authData.payload.password,
     returnSecureToken:true
   }).pipe(

    map(resData=>{
       return  handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken)
       }),
       catchError(errorresp=>{
        return handleError(errorresp);
   }));
        }),
        );

        @Effect({dispatch:false })
   authSuccess=this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS),tap(()=>{
     this.router.navigate(['/'])
     
   }))
    constructor(private actions$:Actions,private http:HttpClient,private router:Router){

    }
}