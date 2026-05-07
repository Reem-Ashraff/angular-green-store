import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  message:any;
  message2:any;
  result:any;
  categories:any;
  form:FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService){
    this.form = this.formBuilder.group({
      category_name:["",[Validators.required]],
      updated_name:["",[Validators.required]]})
  }

  ngOnInit(){
    this.apiservice.get_categories()
    .subscribe({next:(data:any)=>{
      this.categories = data;
    }})
  }

  submit(){
    this.apiservice.update_category(this.form.value)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Category updated successfully."){
        this.message2 = "Category updated successfully.";
      }
      else if(this.result == "Error updating category."){
        this.message == "Error updating category.";
      }
      }})
  }

}
