import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-addplant',
  templateUrl: './addplant.component.html',
  styleUrls: ['./addplant.component.css']
})
export class AddplantComponent {

  message:any;
  message2:any;
  result:any;
  categories:any;
  form:FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService,private sanitizer: DomSanitizer){
    this.form = this.formBuilder.group({
      p_name:["",[Validators.required]],
      category_name:["",[Validators.required]],
      p_price:["",[Validators.required]],
      p_image:["",[Validators.required]],
      fileSource:['']
    })
  }

  ngOnInit(){
    this.apiservice.get_categories()
    .subscribe({next:(data:any)=>{
      this.categories = data;
    }})
  }

  public onFileChange(event:any){
    console.log(event.target.files)
      if (event.target.files.length > 0) {
        const fileee = event.target.files[0];
        this.form.patchValue({
          fileSource: fileee
        });
      }
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    const formData = new FormData();
    formData.append('fileSource',this.form.controls['fileSource'].value);
    formData.append('p_name',this.form.controls['p_name'].value);
    formData.append('category_name',this.form.controls['category_name'].value);
    formData.append('p_price',this.form.controls['p_price'].value);
    formData.append('p_image',this.form.controls['p_image'].value);

    this.apiservice.add_plant(formData)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Plant added successfully."){
        this.message2 = "Plant added successfully.";
      }
      else if(this.result == "Error adding plant."){
        this.message == "Error adding plant.";
      }
    }})
  }


}
