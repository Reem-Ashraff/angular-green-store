import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  username = localStorage.getItem("username");
  log:any;
  href = "";
  items:any=[];
  categories:any=[];
  newproduct:any;
  num:any;
  isShown = false;
  Shown = true;
  cart_items:any;
  cart_elements:any = [];
  cartProducts:any =[]
  products:any=[];
  checkShow = false;
  shopShow = true;

  constructor(private apiservice:ApiService,private router:Router){
    this.apiservice.get_cart(localStorage.getItem("user_id"))
    .subscribe({next:(data:any)=>{
      this.cartProducts = data
      this.products = localStorage.setItem("cart_items",JSON.stringify(this.cartProducts))
      localStorage.setItem("items_num",this.cartProducts.length)
      this.cart_items= localStorage.getItem("cart_items");
      this.cart_elements = JSON.parse(this.cart_items);
      this.num = localStorage.getItem("items_num");
    }});

    if(!!localStorage.getItem("items_num")){
      this.num = localStorage.getItem("items_num")
      this.Shown = false;
      this.checkShow = true;
      this.shopShow = false;
    }
    else{
      this.num = 0;
      this.Shown= true;
      this.checkShow = false;
      this.shopShow = true;
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
    else if(this.num > 0){
      this.Shown=false;
      this.checkShow = true;
      this.shopShow = false;
    }
  }

  ngOnInit(){
    this.apiservice.get_plants()
    .subscribe({next:(data:any)=>{
      for(let item of data){
        item.p_image=this.apiservice.baseURL0+item.p_image
      }
      this.items = data
    }})
    this.apiservice.get_categories()
    .subscribe({next:(data:any)=>{
      this.categories = data;
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
      window.location.reload();
      this.Shown = false;
      this.shopShow=false;
      this.checkShow = true;
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
  // get_category_plants(id:any){
  //   this.apiservice.get_cartegory_plants(id)
  //   .subscribe({next:(data:any)=>{
  //     this.items = data
  //   }})
  // }

  get_value(event:any){
    if(event.target.value == ""){
      this.apiservice.baseURL="http://localhost:8080/green_store_apis/get_plants.php";
      this.ngOnInit();
    }
    else if(event.target.value == "Air purifying"){
      this.apiservice.baseURL="http://localhost:8080/green_store_apis/air_purifying_get.php";
      this.ngOnInit();
    }
    else if(event.target.value == "Ceramic pots"){
      this.apiservice.baseURL="http://localhost:8080/green_store_apis/ceramic_pots_get.php";
      this.ngOnInit();
    }
    else if(event.target.value == "Herbs seeds"){
      this.apiservice.baseURL="http://localhost:8080/green_store_apis/herbs_seeds_get.php";
      this.ngOnInit();
    }
    else if(event.target.value == "Indoor Plants"){
      this.apiservice.baseURL="http://localhost:8080/green_store_apis/indoor_Plants_get.php";
      this.ngOnInit();
    }
    else if(event.target.value == "Low maintenance"){
      this.apiservice.baseURL="http://localhost:8080/green_store_apis/low_maintenance_get.php";
      this.ngOnInit();
    }
    else if(event.target.value == "Plant accessories"){
      this.apiservice.baseURL="http://localhost:8080/green_store_apis/plant_accessories_get.php";
      this.ngOnInit();
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
  toOrder(){
    this.router.navigate(["/checkOrder"]);
  }
}
