import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  searchCity(city:String){
    city ? this.router.navigate([`/rentals/${city}/home`]) : this.router.navigate([`/rentals`]); 
    console.log("Search city called",city);
  }
}
