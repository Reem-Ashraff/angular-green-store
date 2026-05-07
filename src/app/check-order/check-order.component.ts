import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-order',
  templateUrl: './check-order.component.html',
  styleUrls: ['./check-order.component.css']
})
export class CheckOrderComponent {

  form:FormGroup;
  username = localStorage.getItem("username");
  log:any;
  href = "";
  checkShow = false;
  shopShow = true;
  cart_items:any;
  cart_elements:any = [];
  Shown = true;
  num:any;
  isShown = false;
  total=0;
  order_id:any;
  details:any=[];
  msg:any;

  constructor(private apiservice:ApiService,private router:Router,private formBuilder:FormBuilder){

    this.form = this.formBuilder.group({
      firstname:["",[Validators.required]],
      lastname:["",[Validators.required]],
      country:["",[Validators.required]],
      address:["",[Validators.required]],
      city:["",[Validators.required]],
      phone:["",[Validators.required]],
      email:["",[Validators.required]],
      notes:["",[Validators.required]]
    })

    this.cart_items= localStorage.getItem("cart_items");
    this.cart_elements = JSON.parse(this.cart_items);

    for(let item of this.cart_elements){
      this.total = this.total + Number(item.item_price);
    }

    if(!localStorage.getItem("items_num")==true){
      this.num = 0;
      this.Shown= true;
      this.checkShow = false;
      this.shopShow = true;
    }
    else{
      this.num = localStorage.getItem("items_num")
      this.Shown = false;
      this.checkShow = true;
      this.shopShow = false;
    }

    this.log = localStorage.getItem("log");

    if(!localStorage.getItem("log")==true){
      this.log = "Log in";
    }
    if(this.log == "Log in"){
      this.href = "/login";
    }


    if(this.num == 0){
      this.Shown=true;
      this.checkShow = false;
      this.shopShow = true;
    }
    else{
      this.Shown=false;
      this.checkShow = true;
      this.shopShow = false;
    }
  }

  submit(){
    this.apiservice.add_order(this.form.value)
    .subscribe({next:(data:any)=>{
      this.order_id = data;
      this.details=[this.order_id,this.cart_elements,this.total];
      console.log(this.details)
      this.apiservice.add_details(this.details)
      .subscribe({next:(data:any)=>{
        if(data=="You ordered successfully."){
          this.msg="You ordered successfully.";
        }
    }})
    }})
  }

  deleteItem(item_id:any){
    this.apiservice.delete_item(item_id)
    .subscribe({next:(data:any)=>{}})
    window.location.reload();
  }
  
  logout(){
    if(this.log == "Log out"){
      localStorage.clear();
    }
  }

  cartshown(){
    this.isShown = true;
  }
  closecart(){
    this.isShown = false;
  }

  toplants(){
    this.router.navigate(["/plants"]);
  }

}
