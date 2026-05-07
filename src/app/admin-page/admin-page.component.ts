import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  log:any;
  href = "";

  constructor(private apiservice:ApiService){

    this.log = localStorage.getItem("log");
    
    if(!localStorage.getItem("log")==true){
      this.log = "Log in";
    }
    if(this.log == "Log in"){
      this.href = "/login";
    }
  }

  logout(){
    if(this.log == "Log out"){
      localStorage.clear();
    }
  }

}
