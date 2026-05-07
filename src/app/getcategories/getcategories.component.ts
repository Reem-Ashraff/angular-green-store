import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-getcategories',
  templateUrl: './getcategories.component.html',
  styleUrls: ['./getcategories.component.css']
})
export class GetcategoriesComponent {
  categories:any=[];

  constructor(private apiservice:ApiService){}

  ngOnInit(){
    this.apiservice.get_categories()
    .subscribe({next:(data:any)=>{
      this.categories = data
    }})
  }

  delete(id:any){
    this.apiservice.delete_category(id)
    .subscribe({next:(data:any)=>{}})
    window.location.reload();
  }
}
