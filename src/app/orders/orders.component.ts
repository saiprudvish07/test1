import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  usname:any;
  ans:any;
  usmail:any;
  userCartObj:any;
  products:any;
  userObj:any;
  count:any;
  sum:any;
  total:any;
  cfee=100;
  dis=250;
  constructor(private us:UserService) { }

  ngOnInit(): void {
  
     //get user data from local storage
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
    
    //console.log(auth.currentUser?.photoURL)
    
    const user = auth.currentUser;
    //console.log(user)
    let username=user?.uid
    this.usname=auth.currentUser?.displayName
    this.usmail=user?.email
     //get userCartObj from API
     this.us.getProductsFromUserCart(username).subscribe(
       res=>{
           //console.log(res.message)
           this.products=res.message.products
           this.ans=JSON.stringify(this.products)
           console.log(this.ans)
       }
     
     )
     
   
  }

}
