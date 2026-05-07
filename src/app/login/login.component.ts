import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;
  msg = "";
  msg2 = "";
  msg3="";
  res:any;
  cartProducts:any =[]
  products:any=[];
  userdata:any=[];
  
  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService){
    this.form = this.formBuilder.group({
      email:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    //console.log(this.form.value);
    this.msg="";
    this.msg2="";
    this.msg3="";
    this.apiservice.login_user(this.form.value)
    .subscribe({next:(data:any)=>{
      this.res = data;
      //this.apiservice.user_id = this.res["user_id"];
      console.log(this.apiservice.user_id);
      if(this.res["message"]=="you loged in successfully."){
        this.msg="you loged in successfully.";
        localStorage.setItem("log","Log out");
        this.apiservice.user_id = this.res["user_id"];
        this.apiservice.get_user(this.apiservice.user_id)
        .subscribe({next:(data:any)=>{
          this.apiservice.userdata = data;
          this.apiservice.storeuser=localStorage.setItem("username",this.apiservice.userdata[0]["username"]);
          this.apiservice.user_id = localStorage.setItem("user_id",this.apiservice.user_id);
          localStorage.setItem("user_role",this.apiservice.userdata[0]["type"]);
          
        }})
        this.apiservice.get_cart(this.apiservice.user_id)
        .subscribe({next:(data:any)=>{
          this.cartProducts = data
          this.products = localStorage.setItem("cart_items",JSON.stringify(this.cartProducts))
          localStorage.setItem("items_num",this.cartProducts.length)
          this.router.navigate(["/home"]);
        }})
      }
      else if(this.res["message"]=="Invalid password."){
        this.msg2="Invalid password.";
      }
      else if(this.res["message"]=="Email not found."){
        this.msg3="Email not found.";
      }
    }})
  }
  // email = "";
  // pass = "";
  // alert3 = "";
  // alert4 = "";
  // isLoading = true;
  // getEmail(event:any){
  //   this.email = event.target.value;
  // }
  // getPass(event:any){
  //   this.pass = event.target.value;
  //   if(this.email != "" && this.pass != ""){
  //     this.isLoading = false;
  //   }
  // }
  // valid(){
  //   if(this.email == ""){
  //     this.alert3 = "Email must be entered.";
  //   }
  //   else{
  //     this.alert3 = "";
  //   }
  //   if(this.pass == ""){
  //     this.alert4 = "Password must be entered.";
  //   }
  //   else{
  //     this.alert4 = "";
  //   }
  // }
}
