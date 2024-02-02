import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FruitServiceService {

  private fruitsdisplay:{_id:String, id:String,name:String,_v:String}[]=[]
  private updatedfruitdisplay = new Subject<{_id:String, id:String,name:String,_v:String}[]>();

  constructor(private http: HttpClient) { }

  addfruit_service(pid:String, pname:String){
    this.http.post<{message:String,fruit:any}>('https://localhost:3000/api/fruits',{id:pid,name:pname})
    .subscribe((thefruit)=>
    {
      this.fruitsdisplay.push(thefruit.fruit);
      this.updatedfruitdisplay.next([...this.fruitsdisplay]);
    })
  }

 getfruit_service(){
  this.http.get<{message:String,fruits:any}>('https://localhost:3000/api/fruits')
  .subscribe((thefruit)=>{
    this.fruitsdisplay = thefruit.fruits
    this.updatedfruitdisplay.next([...this.fruitsdisplay])
  })
 }

 deletefruit_service(fruitid: String){
  this.http.delete('https://localhost:3000/api/fruits/'+fruitid)
  .subscribe(()=>
  {
    const updatefruitsdeleted = this.fruitsdisplay.filter(fruit => fruit._id !== fruitid)
    this.fruitsdisplay = updatefruitsdeleted;
    this.updatedfruitdisplay.next([...this.fruitsdisplay]);
  })
 }

 getUpdatedListner(){
  return this.updatedfruitdisplay.asObservable();
 }

}