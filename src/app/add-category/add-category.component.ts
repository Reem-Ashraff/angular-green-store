import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  message:any;
  message2:any;
  result:any;
  form:FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService){
    this.form = this.formBuilder.group({
      category_name:["",[Validators.required]]})
  }

  submit(){
    this.apiservice.add_category(this.form.value)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Category added successfully."){
        this.message2 = "Category added successfully.";
      }
      else if(this.result == "Error adding category."){
        this.message == "Error adding category.";
      }
      }})
  }

}
