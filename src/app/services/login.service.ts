import { HttpClient } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { JwtAuthResponse } from './jwt-auth-response';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8080"


  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }

  // calling to server to generate token

  login(credentials:any){
    //toekn generate
    return this.httpClient.post(`${this.url}/token`,credentials);
  }

  generateToken(credentials:any): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(this.url + '/token', credentials).pipe(map(data => {
      this.localStorageService.store('token', data.token);
      this.localStorageService.store('username', data.username);
      return true;
    }));
  }


  loginUser(){
    this.localStorageService.retrieve("token")
    
    return true;
  }

  isLogged(){
    let token=this.localStorageService.retrieve("token")
    //let token= localStorage.getItem("token");
    if(token===undefined || token===''||token==null)
    {
      return false;
    }else{
      return true;
    }
    
  }

  logout(){
   // localStorage.removeItem('token')
   this.localStorageService.clear("token")
   this.localStorageService.clear("username")
    return true;
  }

  // for geeting the token
  getToken(){
    let token=localStorage.getItem('token')
    return token;

  }
}
