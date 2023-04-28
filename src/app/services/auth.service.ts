import CredentialsModel  from '../models/credentials-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserModel from '../models/user-model';
import { ConfigService } from '../utils/config.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:any ;
  private token:string;
  public new:boolean 
  public manager:boolean = false

  public constructor( private http:HttpClient, private config: ConfigService, public router:Router) { 
    const token = window.localStorage.getItem('token')    
    if(token)  this.setToken(token)
    const user = window.localStorage.getItem('user')
    if(user !=='undefined')  this.setUser(JSON.parse(user))
  }
  
  private setToken (token:string):void{
    this.token = token;
    window.localStorage.setItem('token',token)
  } 
  
  private setUser (user:UserModel):void{
    window.localStorage.setItem('user',JSON.stringify(user) )
    this.user = user    ;
    if (user?.role) this.manager = true
  }

  public async register(user:UserModel):Promise<void>{
    const observable = this.http.post<{User:UserModel,token:string}>(this.config.register,user);
    const data = await firstValueFrom(observable)
    console.log('12');
    
    this.setToken(data.token)
    this.setUser(data.User)
    this.new=true
  }
  
  
  public async login(credentials:CredentialsModel):Promise<void>{
    const observable = this.http.post<{user:UserModel,token:string}>(this.config.login,credentials);
    const data = await firstValueFrom(observable)    
    this.setToken(data.token)
    this.setUser(data.user) 
  } 

  public logout():void{
    this.token='';
    this.user={};
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    this.router.navigateByUrl('home');
    this.manager = false
    
  }

  public isLoggedIn():boolean{
    return this.token && this.token!=''
  }

  public getToken():{token:string, user:UserModel}{
    const token =  this.token
    const user =  this.user
    return {token,user}

  }

}
