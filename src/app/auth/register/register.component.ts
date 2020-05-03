import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }
  formData:any = {}
  errors:any;
  ngOnInit(): void {
  }
  register(){
      this.auth.registerUser(this.formData).subscribe(res=>{
        console.log("Registered Successfully.....",res);
        this.router.navigate(['/login',{registerd:'Success'}]);
      },error=>{
        this.errors = error.error.Errors;
        console.error("Error while register user.....",this.errors);
      })
  }
}
