import { Component, OnInit } from '@angular/core';
import { FruitServiceService } from '../fruit-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-fruit-display',
  templateUrl: './fruit-display.component.html',
  styleUrls: ['./fruit-display.component.css']
})
export class FruitDisplayComponent implements OnInit {

  fruits: {_id:String, id:String,name:String, _v:String}[] = [];

  constructor(public fruitservice: FruitServiceService) { }

  private fruitsubscription!: Subscription;

  ngOnInit(){
    this.fruitservice.getfruit_service();
    this.fruitsubscription = this.fruitservice.getUpdatedListner()
    .subscribe((fruits:{_id:String, id:String,name:String, _v:String}[])=>
    {

      this.fruits = fruits
      
    });
  }

  ngOnDestroy(){
    this.fruitsubscription.unsubscribe();
  }

  ondelete(id:String){
    this.fruitservice.deletefruit_service(id)
  }

}
