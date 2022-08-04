import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { getAuth, signOut } from "firebase/auth";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vnrcanteen';
  constructor(public us:UserService,private router:Router){}
  
 
  userLogout(){

 

signOut(this.us.AuthData).then(() => {
  // Sign-out successful.
  alert("Logut success")
}).catch((error) => {
  // An error happened.
});
    this.us.userLoginStatus=false;
    this.router.navigateByUrl('/register')
  }
   
}
