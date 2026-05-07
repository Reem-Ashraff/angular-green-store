import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-plant',
  templateUrl: './delete-plant.component.html',
  styleUrls: ['./delete-plant.component.css']
})
export class DeletePlantComponent {

  message:any;
  message2:any;
  result:any;
  items:any;
  form:FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private apiservice:ApiService){
    this.form = this.formBuilder.group({
      p_name:["",[Validators.required]]})
  }

  ngOnInit(){
    this.apiservice.get_plants()
    .subscribe({next:(data:any)=>{
      this.items = data;
    }})
  }

  submit(){
    this.apiservice.delete_plant_byname(this.form.value)
    .subscribe({next:(data:any)=>{
      this.result = data
      if(this.result == "Plant deleted successffully."){
        this.message2 = "Plant deleted successffully.";
      }
      else if(this.result == "Plant cannot be deleted."){
        this.message == "Plant cannot be deleted.";
      }
      }})
  }

}
