import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './signin/signin.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './shared/auth.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddplantComponent } from './addplant/addplant.component';
import { GetcategoriesComponent } from './getcategories/getcategories.component';
import { GetplantsComponent } from './getplants/getplants.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { DeletePlantComponent } from './delete-plant/delete-plant.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdatePlantComponent } from './update-plant/update-plant.component';
import { CheckOrderComponent } from './check-order/check-order.component';

const routes: Routes = [
  {path:"home",component:HomeComponent,canActivate:[AuthGuard],data:{role:["user"]}},
  {path:"login",component:LoginComponent},
  {path:"about",component:AboutComponent,canActivate:[AuthGuard],data:{role:["user"]}},
  {path:"signin",component:SigninComponent},
  {path:"plants",component:ShopComponent,canActivate:[AuthGuard],data:{role:["user"]}},
  {path:"checkOrder",component:CheckOrderComponent,canActivate:[AuthGuard],data:{role:["user"]}},
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {path:"adminpage",component:AdminPageComponent,data:{role:["admin"]}},
  {path:"addcategory",component:AddCategoryComponent,data:{role:["admin"]}},
  {path:"addplant",component:AddplantComponent,data:{role:["admin"]}},
  {path:"categories",component:GetcategoriesComponent,data:{role:["admin"]}},
  {path:"ourplants",component:GetplantsComponent,data:{role:["admin"]}},
  {path:"categoryItems/:id",component:CategoryItemsComponent,data:{role:["admin"]}},
  {path:"deletecategory",component:DeleteCategoryComponent,data:{role:["admin"]}},
  {path:"deleteplant",component:DeletePlantComponent,data:{role:["admin"]}},
  {path:"updateCategory",component:UpdateCategoryComponent,data:{role:["admin"]}},
  {path:"updatePlant",component:UpdatePlantComponent,data:{role:["admin"]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
