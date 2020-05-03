import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterModel } from './register.model';
import { LoginModel } from './login.model';
import { map } from 'rxjs/operators'
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
class DecodeToken{
  exp:number = 0 ;
  username:String = '';
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedToken;
  constructor(private http:HttpClient) { 
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_user')) || new DecodeToken();
  }
 
  private saveToken(token):String{
    this.decodedToken = jwt_decode(token);
    localStorage.setItem('bwm_user',JSON.stringify(this.decodedToken));
    localStorage.setItem('bwm-token',token);
    return token;
  }
  public registerUser(userData:RegisterModel):Observable<any>{
    return this.http.post('/api/v1/users/register',userData);
  }
  public loginUser(userData:LoginModel):Observable<any>{
    return this.http.post('/api/v1/users/auth',userData).pipe(map(token=>{
      return this.saveToken(token);
    }));
  }
  public isAuthenticated():boolean{
      const isBefore = moment().isBefore(moment.unix(this.decodedToken.exp));
      return isBefore;
  }
  public logout(){
    localStorage.removeItem('bwm_user');
    localStorage.removeItem('bwm-token');
    this.decodedToken = new DecodeToken();
  }
  public getUsername():String{
    return this.decodedToken.username;
  }
  public getAuthToken():String{
    return localStorage.getItem('bwm-token');
  }
}
