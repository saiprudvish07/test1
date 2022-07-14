import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vnrcanteen';
  constructor(public us:UserService){}

  onSignup(userObj:any){

    
       
    }
    // userLogin(){
    //   this.us.usersignin().subscribe(
    //     res=>{
    //       if(res.message==="User created"){
    //         alert("User created")
    //         //navigate to login component
    //       }
    //       else{
    //         alert(res.message)
    //       }
    //     },
    //     err=>{
    //       console.log(err)
    //       //alert("Something went wrong in user creation")
    //     }
    //   )
    // }
}
