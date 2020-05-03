import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router , ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors:any;
  loginForm:FormGroup;
  notifyMessage:String='';
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm()
    this.route.params.subscribe((param)=>{
       if(param.registerd && param.registerd=='Success'){
        this.notifyMessage = "You have successfully registered..!"
       } 
    })
  }
  initForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,
                 Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]
                ],
      password:['',[Validators.required,
                    Validators.minLength(6)]]
    })
  }
  login(){
    console.log("Login called",this.loginForm.value);
    this.auth.loginUser(this.loginForm.value).subscribe(
      (res)=>{
        console.log("Res",res);
        this.router.navigate(['/rentals'])
    },
    (error)=>{
      this.errors = error.error.Errors;
      console.log("Error",error);
    }
    )
  }
  isInvalidForm(field){
    return this.loginForm.controls[field].invalid && (this.loginForm.controls[field].dirty && this.loginForm.controls[field].touched)
  }
  isRequired(field){
    return this.loginForm.controls[field].errors.required;
  }
}
