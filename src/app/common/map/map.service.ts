import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private locationCache:any = {};
  constructor(private http:HttpClient,private camelizePipe:CamelizePipe) { }
  private camelize(value:String){
    return this.camelizePipe.transform(value);
  }
  private cacheLocation(location:String,geomatryData:any){
    const locationKey = this.camelize(location);
    this.locationCache[locationKey] = geomatryData;
  }
  private isLocationCached(location:String):boolean{
    return this.locationCache[this.camelize(location)];
  }
   getGeocodeLocation(search:String):Observable<any>{
    return new Observable((observer)=>{
      if(this.isLocationCached(search)){
        observer.next(this.locationCache[this.camelize(search)]);
      }else{
        this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoianM1MzciLCJhIjoiY2s5MTRmcThkMDR2eDNscXJ1eXYzYjRzcCJ9.AI4z5cd0AMFpZuiuebYuiw`).subscribe(
        (res)=>{
        this.cacheLocation(search,res);
        observer.next(res);
      },
      (error)=>{
        observer.error(error);
      }
      )
      }
    })    
  }
}
