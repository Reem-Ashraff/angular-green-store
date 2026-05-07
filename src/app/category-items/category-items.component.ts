import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent {
  
  id:any;
  items:any=[];
  name:any;

  constructor(private apiservice:ApiService,private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiservice.get_cartegory_plants(this.id)
    .subscribe({next:(data:any)=>{
      for(let item of data){
        item.p_image=this.apiservice.baseURL0+item.p_image
      }
      this.items = data
      this.name = this.items[0]["category_id"];
      console.log(this.name);
    }})
  }

  delete(id:any){
    this.apiservice.delete_plant(id)
    .subscribe({next:(data:any)=>{}})
    window.location.reload();
  }
}
