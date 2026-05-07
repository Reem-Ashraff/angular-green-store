import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cart_items:any;
  cartProducts:any =[];
  products:any=[];
  href = "";
  log:any;
  isShown = false;
  Shown = true;
  nothidden = false;
  username = localStorage.getItem("username");
  items:any=[];
  newproduct:any;
  num :any;
  cart_elements:any;
  checkShow = false;
  shopShow = true;

  constructor(private router:Router,private apiservice:ApiService){
    this.cart_items= localStorage.getItem("cart_items");
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

    this.apiservice.get_cart(localStorage.getItem("user_id"))
    .subscribe({next:(data:any)=>{
        this.cartProducts = data
        this.products = localStorage.setItem("cart_items",JSON.stringify(this.cartProducts))
        localStorage.setItem("items_num",this.cartProducts.length)
        this.cart_items= localStorage.getItem("cart_items");
        this.cart_elements = JSON.parse(this.cart_items);
        this.num = localStorage.getItem("items_num");
    }});

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

  ngOnInit(){
    this.apiservice.baseURL="http://localhost:8080/green_store_apis/get_plants_home.php";
    this.apiservice.get_plants()
    .subscribe({next:(data:any)=>{
      for(let item of data){
        item.p_image=this.apiservice.baseURL0+item.p_image
      }
      this.items = data
    }})
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

  additem(plant_name:any,plant_price:any,plant_image:any){
    if(this.log == "Log out"){
      this.newproduct = {
        "id": localStorage.getItem("user_id"),
        "item_image":plant_image,
        "item_name":plant_name,         
        "item_price":plant_price
      }
      this.apiservice.addToCart(this.newproduct)
      .subscribe({next:(data:any)=>{}});
      this.Shown = false;
      window.location.reload();
    }
    else if(this.log == "Log in"){
      this.newproduct = {
        "item_image":plant_image,
        "item_name":plant_name,         
        "item_price":plant_price
      }
      this.apiservice.cartitems.push(this.newproduct);
      this.cart_elements = this.apiservice.cartitems;
      this.num = this.apiservice.cartitems.length;
      this.Shown = false;
    }
  }

  cartshown(){
    this.isShown = true;
  }
  closecart(){
    this.isShown = false;
  }
  title = "welcome to the greenstore";
  toplants(){
    this.router.navigate(["/plants"]);
  }
  hidetext(){
    this.nothidden = !this.nothidden
  }
}
