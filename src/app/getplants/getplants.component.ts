import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-getplants',
  templateUrl: './getplants.component.html',
  styleUrls: ['./getplants.component.css']
})
export class GetplantsComponent {
  
  items:any=[];

  constructor(private apiservice:ApiService){}

  ngOnInit(){
    this.apiservice.get_plants()
    .subscribe({next:(data:any)=>{
      for(let item of data){
        item.p_image=this.apiservice.baseURL0+item.p_image
      }
      this.items = data
    }})
  }

  delete(id:any){
    this.apiservice.delete_plant(id)
    .subscribe({next:(data:any)=>{}})
    window.location.reload();
  }
}
