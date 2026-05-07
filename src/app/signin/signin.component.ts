import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  form:FormGroup;
  msg = "";
  msg2 = "";
  res :any;
  cartProducts:any =[]
  products:any=[];

  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService){
  this.form = this.formBuilder.group({
    username:["",[Validators.required]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required]],
    confirmPassword:["",[Validators.required]]
  },{validator: this.passwordMatchValidator})
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
  
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } 
      else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.msg="";
    this.msg2="";
    this.apiservice.insert_user(this.form.value)
    .subscribe({next:(data:any)=>{
      this.res = data;
      if(this.res["message"]=="Username or email already exists."){
        this.msg="Username or email already exists.";
      }
      else if(this.res["message"]=="User registered successfully."){
        this.msg2="You registered successfully.";
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
    }})
  }
// password = "";
// email = "";
// confirmPassword = "";
// username:string = "";
// alert:string = "";
// alert1:string = "";
// alert2:string = "";
// alert3:string = "";
// pattern = /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/;
// isLoading = true;
// getName(event:any){
//   this.username = event.target.value;
// }
// getEmail(event:any){
//   this.email = event.target.value;
// }
// getPassword(event:any){
//   this.password = event.target.value;
// }
// getConfirmPassword(event:any){
//   this.confirmPassword = event.target.value;
//   if(this.username != "" && this.email != "" && this.password != "" && this.confirmPassword != ""){
//     this.isLoading = false;
//   }
// }
// passPatern(){
//   if(this.pattern.test(this.password) == false){
//     this.alert1 = "Password not valid.";
//   }
//   else if(this.pattern.test(this.password) == false){
//     this.alert1 = "";
//   }
// }
// validation(){
//   if(this.username == ""){
//     this.alert = "Username must be entered."
//   }
//   else if(this.username.length < 3){
//     this.alert = "Username must be more than 2 characters.";
//   }
//   else{
//     this.alert = "";
//   }
//   if(this.email == ""){
//     this.alert3 = "Email must be entered.";
//   }
//   else{
//     this.alert3 = "";
//   }
//   if(this.password == ""){
//     this.alert1 = "Password must be entered.";
//   }
//   else if(this.password.length < 8){
//     this.alert1 = "Password must be equal or more than 8 characters.";
//   }
//   else if(this.pattern.test(this.password) == false){
//     this.alert1 = "Password not valid.";
//   }
//   else{
//     this.alert1 = "";
//   }
//   if(this.confirmPassword == ""){
//     this.alert2 = "Conirm Password must be entered.";
//   }
//   else if(this.confirmPassword != this.password){
//     this.alert2 = "Password does not match."
//   }
//   else if(this.confirmPassword == this.password){
//     this.alert2 = "";
//   }
// }
}
