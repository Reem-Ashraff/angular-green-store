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
  baseURL0 = "https://greenstore.infinityfreeapp.com";
  baseURL = "https://greenstore.infinityfreeapp.com/get_plants.php";
  categoriesURL = "https://greenstore.infinityfreeapp.com/get_categories.php";
  insertURL="https://greenstore.infinityfreeapp.com/signup_api.php";
  loginURL = "https://greenstore.infinityfreeapp.com/login.php";
  insertCartURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/insertToCart.php";
  userURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/get_user.php";
  getcartURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/get_cart.php";
  deleteitemURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/delete_cartItem.php";
  deleteplantURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/delete_plant.php";
  addcategoryURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/add_category.php";
  deletecategoryURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/delete_category.php";
  categoryItemsURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/get_categoryitems.php";
  addplantURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/add_plant.php";
  deletecategorybynameURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/delete_category_byname.php";
  deleteplantbynameURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/delete_plant_byname.php";
  updatecategoryURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/update_category.php";
  updateplantnameURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/update_plantname.php";
  updateplantpriceURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/update_plantprice.php";
  updateplantimgURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/update_plantimg.php";
  updateplantcategoryURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/update_plantcategory.php";
  allusersURL = "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/get_allusers.php";
  orderURL= "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/add_order.php";
  detailsURL= "https://angular-green-store.vercel.app/greenstore.infinityfreeapp.com/add_details.php";

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
    //const body = JSON.stringify(user);
    //return this.http.post<[]>(this.loginURL,body);
    return this.http.post<[]>(`${this.baseURL0}/login.php`,user);
  }
  get_user(id:any){
    //const body = JSON.stringify(id);
    //return this.http.post<[]>(this.userURL,body);
    return this.http.post<[]>(`${this.baseURL0}/get_user.php`,user);
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


