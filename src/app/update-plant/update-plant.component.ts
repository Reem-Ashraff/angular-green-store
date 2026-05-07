import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update-plant',
  templateUrl: './update-plant.component.html',
  styleUrls: ['./update-plant.component.css']
})
export class UpdatePlantComponent {

  message:any;
  message2:any;
  result:any;
  shown = true;
  nameShown = false;
  categoryShown = false;
  priceShown = false;
  imgShown = false;
  items:any;
  categories:any;
  form:FormGroup;
  form1:FormGroup;
  form2:FormGroup;
  form3:FormGroup;
  form4:FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService,private sanitizer: DomSanitizer){
    this.form = this.formBuilder.group({
      updatewhat:["",[Validators.required]]})

    this.form1 = this.formBuilder.group({
      name:["",[Validators.required]],
      updated_name:["",[Validators.required]]})

    this.form2 = this.formBuilder.group({
      name:["",[Validators.required]],
      updated_category:["",[Validators.required]]})

    this.form3 = this.formBuilder.group({
      name:["",[Validators.required]],
      updated_price:["",[Validators.required]]})

    this.form4 = this.formBuilder.group({
      name:["",[Validators.required]],
      updated_image:["",[Validators.required]],
      fileSource:[""]})
  }

  ngOnInit(){
    this.apiservice.get_plants()
    .subscribe({next:(data:any)=>{
      this.items = data;
    }})

    this.apiservice.get_categories()
    .subscribe({next:(data:any)=>{
      this.categories = data;
    }})
  }


  public onFileChange(event:any){
    console.log(event.target.files)
      if (event.target.files.length > 0) {
        const fileee = event.target.files[0];
        this.form4.patchValue({
          fileSource: fileee
        });
      }
  }

  submit(){
    if(this.form.value["updatewhat"]=="p_name"){
      this.shown = false;
      this.nameShown = true;
    }
    else if(this.form.value["updatewhat"]=="p_category"){
      this.shown = false;
      this.categoryShown = true;
    }
    else if(this.form.value["updatewhat"]=="p_price"){
      this.shown = false;
      this.priceShown = true;
    }
    else if(this.form.value["updatewhat"]=="p_image"){
      this.shown = false;
      this.imgShown = true;
    }
  }

  submit1(){
    this.apiservice.update_plantName(this.form1.value)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Plant updated successfully."){
        this.message2 = "Plant updated successfully.";
      }
      else if(this.result == "Error updating plant."){
        this.message == "Error updating plant.";
      }
    }})
  }

  submit2(){
    this.apiservice.update_plantCategory(this.form2.value)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Plant updated successfully."){
        this.message2 = "Plant updated successfully.";
      }
      else if(this.result == "Error updating plant."){
        this.message == "Error updating plant.";
      }
    }})
  }

  submit3(){
    this.apiservice.update_plantPrice(this.form3.value)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Plant updated successfully."){
        this.message2 = "Plant updated successfully.";
      }
      else if(this.result == "Error updating plant."){
        this.message == "Error updating plant.";
      }
    }})
  }

  submit4(){
    const formData1 = new FormData();
    formData1.append('fileSource',this.form4.controls['fileSource'].value);
    formData1.append('name',this.form4.controls['name'].value);
    formData1.append('updated_image',this.form4.controls['updated_image'].value);

    this.apiservice.update_plantImg(formData1)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Plant updated successfully."){
        this.message2 = "Plant updated successfully.";
      }
      else if(this.result == "Error updating plant."){
        this.message == "Error updating plant.";
      }
    }})
  }

}
