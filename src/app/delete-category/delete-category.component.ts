import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {

  message:any;
  message2:any;
  result:any;
  categories:any;
  form:FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService){
    this.form = this.formBuilder.group({
      category_name:["",[Validators.required]]})
  }

  ngOnInit(){
    this.apiservice.get_categories()
    .subscribe({next:(data:any)=>{
      this.categories = data;
    }})
  }

  submit(){
    this.apiservice.delete_category_byname(this.form.value)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Category deleted successffully."){
        this.message2 = "Category deleted successffully.";
      }
      else if(this.result == "Category cannot be deleted."){
        this.message == "Category cannot be deleted.";
      }
      }})
  }

}
