import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  AuthData:any;

  userLoginStatus:boolean=false;
  constructor(private hc:HttpClient) { }
     

  getCurrentAuth(userAuth:any){
 this.AuthData=userAuth;
  }

  //to read all products
  getProducts():Observable<any>{

    return this.hc.get('/user/getitems')
 
}
}
