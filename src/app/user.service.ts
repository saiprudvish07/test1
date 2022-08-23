import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  AuthData:any;

  userLoginStatus:boolean=false;
  constructor(private hc:HttpClient) { }
     

  dataSource=new BehaviorSubject<any>(0)

  dataObservable=this.dataSource.asObservable();

    updateDataObservable(data:any){
      this.dataSource.next(data)
    }
  getCurrentAuth(userAuth:any){
 this.AuthData=userAuth;
  }

 
  sendProductToUserCart(userProductObj:any):Observable<any>{

    return this.hc.post("/user/add-to-cart",userProductObj)
  }
  deleteProductfromUserCart(userProductObj:any):Observable<any>{

    return this.hc.post("/user/del-from-cart",userProductObj)
  }
   
  getProductsFromUserCart(username:any):Observable<any>{
    return this.hc.get(`/user/getproducts/${username}`)
  }
  //to read all products
  getProducts():Observable<any>{

    return this.hc.get('/user/getitems')
 
}
}
