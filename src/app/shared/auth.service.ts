import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roleAs:any;

  constructor() { }

  isLogin(){
    return !!localStorage.getItem('username')
  }

  getRole() {
    var user_data: any =localStorage.getItem('user_role');
//user_data= JSON.parse(user_data)
    this.roleAs=user_data;
    return this.roleAs;
  }


}
