
import { NgModule, ɵɵsyntheticHostProperty } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ShopComponent } from './shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Cookies } from 'typescript-cookie';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddplantComponent } from './addplant/addplant.component';
import { GetcategoriesComponent } from './getcategories/getcategories.component';
import { GetplantsComponent } from './getplants/getplants.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { DeletePlantComponent } from './delete-plant/delete-plant.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdatePlantComponent } from './update-plant/update-plant.component';
import { CheckOrderComponent } from './check-order/check-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SigninComponent,
    ShopComponent,
    AddCategoryComponent,
    AdminPageComponent,
    AddplantComponent,
    GetcategoriesComponent,
    GetplantsComponent,
    CategoryItemsComponent,
    DeleteCategoryComponent,
    DeletePlantComponent,
    UpdateCategoryComponent,
    UpdatePlantComponent,
    CheckOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
