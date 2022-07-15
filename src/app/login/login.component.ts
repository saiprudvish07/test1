import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public us:UserService,private router:Router) { }

  ngOnInit(): void {
  }


  loginCheck=async(userCredential:any)=>{

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
  
    
    await signInWithEmailAndPassword(auth, userCredential.email, userCredential.password)
    .then((credential) => {
      // Signed in 
      const user = credential.user;
      this.us.getCurrentAuth(auth)
      alert("User Login Success")
       this.us.userLoginStatus=true;
       this.router.navigateByUrl('/home')
    //console.log(auth.currentUser)
      // ...
    })
    .catch((error) => {
      alert("Invalid Credentials")
     // console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
}
