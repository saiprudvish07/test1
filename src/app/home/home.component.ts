import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public us:UserService){}

  ngOnInit(): void {
  }
vals:any;
 
  
 onlogin=async()=>{

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

  const googleProvider = new GoogleAuthProvider();


  
  await signInWithPopup(auth, googleProvider).then(
     (res)=>{
         const user = res.user;
           
          console.log(user)
          this.vals=user

     }
 );
     
 }
}
