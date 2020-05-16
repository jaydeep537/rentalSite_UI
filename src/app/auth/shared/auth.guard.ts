import { Injectable } from '@angular/core';
import { CanActivate, Router ,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service' 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url:String;
  constructor(private auth:AuthService,private router:Router){}
  private handleSucessAuth(){
     if(this.isLoginOrRegister()){
        this.router.navigate(['/rentals']);
        return false;
     }
    return true;
  }
  private handleNotSucessAuth(){
    if(this.isLoginOrRegister()){
        return true;
     }
     this.router.navigate(['/login']);
     return false;
  }
  private isLoginOrRegister(){
      return this.url.includes('login')||this.url.includes('register')? true:false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
    this.url = state.url;
    if(this.auth.isAuthenticated()){
        return this.handleSucessAuth();
    }
    return this.handleNotSucessAuth()
  }
}