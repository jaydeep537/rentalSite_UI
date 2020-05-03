import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../shared/auth.guard'
const authRoutes:Routes = [
    { path:'login',component:LoginComponent,canActivate:[AuthGuard]},
    { path:'register',component:RegisterComponent,canActivate:[AuthGuard]}
]
@NgModule({    
    imports:[RouterModule.forChild(authRoutes)],
    exports:[RouterModule]
})
export class AuthRoutingModule{}
