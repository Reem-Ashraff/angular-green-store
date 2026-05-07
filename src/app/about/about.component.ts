import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  username = localStorage.getItem("username");
  isShown = false;
  Shown = true;
  num:any;
  cartProducts:any =[];
  products:any=[];
  cart_elements:any = [];
  cart_items:any= localStorage.getItem("cart_items");
  log:any;
  href = "";
  text = "PROVIDE FRESH AND HEALTHY PLANTS FOR YOUR SPACE";
  checkShow = false;
  shopShow = true;

  constructor(private apiservice:ApiService,private router:Router){
    this.cart_elements = JSON.parse(this.cart_items);
    if(!localStorage.getItem("items_num")==true){
      this.num = 0;
      this.Shown= true;
      this.checkShow = false;
      this.shopShow = true;
    }
    else{
      this.num = localStorage.getItem("items_num");
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

    this.apiservice.get_cart(localStorage.getItem("user_id"))
    .subscribe({next:(data:any)=>{
        this.cartProducts = data
        this.products = localStorage.setItem("cart_items",JSON.stringify(this.cartProducts))
        localStorage.setItem("items_num",this.cartProducts.length)
        this.cart_items= localStorage.getItem("cart_items");
        this.cart_elements = JSON.parse(this.cart_items);
        this.num = localStorage.getItem("items_num");
    }});
  }
  
  logout(){
    if(this.log == "Log out"){
      localStorage.clear();
    }
  }
  deleteItem(item_id:any){
    this.apiservice.delete_item(item_id)
    .subscribe({next:(data:any)=>{}})
    window.location.reload();
  }

  toplants(){
    this.router.navigate(["/plants"]);
  }

  cartshown(){
    this.isShown = true;
  }
  closecart(){
    this.isShown = false;
  }
  
}
