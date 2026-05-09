import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public cartitems:any = [];

  user_id:any;
  userdata:any = null;
  baseURL0 = "https://dev-green-store-php.pantheonsite.io";
  baseURL = "https://dev-green-store-php.pantheonsite.io/get_plants.php";
  categoriesURL = "https://dev-green-store-php.pantheonsite.io/get_categories.php";
  insertURL="https://dev-green-store-php.pantheonsite.io/signup_api.php";
  loginURL = "https://dev-green-store-php.pantheonsite.io/login.php";
  insertCartURL = "https://dev-green-store-php.pantheonsite.io/insertToCart.php";
  userURL = "https://dev-green-store-php.pantheonsite.io/get_user.php";
  getcartURL = "https://dev-green-store-php.pantheonsite.io/get_cart.php";
  deleteitemURL = "https://dev-green-store-php.pantheonsite.io/delete_cartItem.php";
  deleteplantURL = "https://dev-green-store-php.pantheonsite.io/delete_plant.php";
  addcategoryURL = "https://dev-green-store-php.pantheonsite.io/add_category.php";
  deletecategoryURL = "https://dev-green-store-php.pantheonsite.io/delete_category.php";
  categoryItemsURL = "https://dev-green-store-php.pantheonsite.io/get_categoryitems.php";
  addplantURL = "https://dev-green-store-php.pantheonsite.io/add_plant.php";
  deletecategorybynameURL = "https://dev-green-store-php.pantheonsite.io/delete_category_byname.php";
  deleteplantbynameURL = "https://dev-green-store-php.pantheonsite.io/delete_plant_byname.php";
  updatecategoryURL = "https://dev-green-store-php.pantheonsite.io/update_category.php";
  updateplantnameURL = "https://dev-green-store-php.pantheonsite.io/update_plantname.php";
  updateplantpriceURL = "https://dev-green-store-php.pantheonsite.io/update_plantprice.php";
  updateplantimgURL = "https://dev-green-store-php.pantheonsite.io/update_plantimg.php";
  updateplantcategoryURL = "https://dev-green-store-php.pantheonsite.io/update_plantcategory.php";
  allusersURL = "https://dev-green-store-php.pantheonsite.io/get_allusers.php";
  orderURL= "https://dev-green-store-php.pantheonsite.io/add_order.php";
  detailsURL= "https://dev-green-store-php.pantheonsite.io/add_details.php";

  setLocalData:any = [];
  storeuser:any;
  //username:any;

  constructor(private http:HttpClient) {
    //localStorage.clear();
  }

  get_plants(){
    return this.http.get<[]>(this.baseURL);
  }
  get_categories(){
    return this.http.get<[]>(this.categoriesURL);
  }
  get_cartegory_plants(id:any){
    //const body = JSON.stringify(id);
    return this.http.get<[]>(this.categoryItemsURL+"?id="+id);
  }
  insert_user(user:any){
    const body = JSON.stringify(user);
    return this.http.post<[]>(this.insertURL,body);
  }
  login_user(user:any){
    const body = JSON.stringify(user);
    //return this.http.post<[]>(this.loginURL,body);
    return this.http.post<[]>(`${this.baseURL0}/login.php`,body);
  }
  get_user(id:any){
    const body = JSON.stringify(id);
    return this.http.post<[]>(this.userURL,body);
  }
  get_alluser(){
    return this.http.get<[]>(this.allusersURL);
  }
  addToCart(items:any){
    const body = JSON.stringify(items);
    return this.http.post<[]>(this.insertCartURL,body);
  }
  get_cart(id:any){
    const body = JSON.stringify(id);
    return this.http.post<[]>(this.getcartURL,body);
  }
  delete_item(id:any){
    const body = JSON.stringify(id);
    return this.http.post<[]>(this.deleteitemURL,body);
  }
  delete_plant(id:any){
    const body = JSON.stringify(id);
    return this.http.post<[]>(this.deleteplantURL,body);
  }
  delete_category(id:any){
    const body = JSON.stringify(id);
    return this.http.post<[]>(this.deletecategoryURL,body);
  }
  add_category(category:any){
    const body = JSON.stringify(category);
    return this.http.post<[]>(this.addcategoryURL,body);
  }
  add_plant(plant:any){
    //const body = JSON.stringify(plant);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.addplantURL, plant, {headers: headers})
    .pipe(map((res: any) => {
    return res;}))
    //return this.http.post<[]>(this.addplantURL,body);
  }
  delete_category_byname(name:any){
    const body = JSON.stringify(name);
    return this.http.post<[]>(this.deletecategorybynameURL,body);
  }
  delete_plant_byname(name:any){
    const body = JSON.stringify(name);
    return this.http.post<[]>(this.deleteplantbynameURL,body);
  }
  update_category(name:any){
    const body = JSON.stringify(name);
    return this.http.post<[]>(this.updatecategoryURL,body);
  }
  update_plantName(name:any){
    const body = JSON.stringify(name);
    return this.http.post<[]>(this.updateplantnameURL,body);
  }
  update_plantPrice(name:any){
    const body = JSON.stringify(name);
    return this.http.post<[]>(this.updateplantpriceURL,body);
  }
  update_plantImg(name:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.updateplantimgURL, name, {headers: headers})
    .pipe(map((res: any) => {
    return res;}))
    //const body = JSON.stringify(name);
    //return this.http.post<[]>(this.updateplantimgURL,body);
  }
  update_plantCategory(name:any){
    const body = JSON.stringify(name);
    return this.http.post<[]>(this.updateplantcategoryURL,body);
  }
  add_order(data:any){
    const body = JSON.stringify(data);
    return this.http.post<[]>(this.orderURL,body);
  }
  add_details(data:any){
    const body = JSON.stringify(data);
    return this.http.post<[]>(this.detailsURL,body);
  }
}


