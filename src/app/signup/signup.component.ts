import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { UserService } from '../user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  signUpCheck=async(userObj:any)=>{
     

      const firebaseConfig = {
        apiKey: "AIzaSyC3_sVw1vM2JJYHIZrmhW0eYOfz9aEOJKI",
        authDomain: "vnrcanteen-dc1ee.firebaseapp.com",
        projectId: "vnrcanteen-dc1ee",
        storageBucket: "vnrcanteen-dc1ee.appspot.com",
        messagingSenderId: "560693712371",
        appId: "1:560693712371:web:2ff1567022f2b7f06c2e86",
        measurementId: "G-SZ11ZY2DL6"
      };
      
     
      const app = initializeApp(firebaseConfig);
      const auth=getAuth(app);
    
     
    //console.log(userCredential.email)
    
      
      await createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        this.us.getCurrentAuth(auth)
        alert("User signup Success")
        // this.us.userLoginStatus=true;
         this.router.navigateByUrl('/register/signin')
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    
  }
}
