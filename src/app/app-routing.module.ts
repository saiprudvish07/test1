import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'orders',component:OrdersComponent},
  {path:'register',component:RegisterComponent,children:[
    {path:"signin",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:'',redirectTo:"/register/signin",pathMatch:"full"}
  ]},
  {path:'',redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
