import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs'
import { Rental } from './rental.model'
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  rentals:Rental[]= [
    {
      id:"1",
      title:"Central Appartment",
      city:"New York",
      street:"Times Square",
      category:"Appartment",
      image:"http://via.placeholder.com/350x250",
      bedRooms:3,
      description:"Very Nice Appartment",
      dailyRate:45,
      shared:false,
      createdAt:'12/4/20200'
    },
    {
      id:"2",
      title:"Central Appartment",
      city:"New York",
      street:"Times Square",
      category:"Appartment",
      image:"http://via.placeholder.com/350x250",
      bedRooms:3,
      description:"Very Nice Appartment",
      dailyRate:35,
      shared:false,
      createdAt:'12/4/20200'
    },
    {
      id:"3",
      title:"Central Appartment",
      city:"New York",
      street:"Times Square",
      category:"Appartment",
      image:"http://via.placeholder.com/350x250",
      bedRooms:3,
      description:"Very Nice Appartment",
      dailyRate:55,
      shared:false,
      createdAt:'12/4/20200'
    },
    {
      id:"4",
      title:"Central Appartment",
      city:"New York",
      street:"Times Square",
      category:"Appartment",
      image:"http://via.placeholder.com/350x250",
      bedRooms:3,
      description:"Very Nice Appartment",
      dailyRate:95,
      shared:false,
      createdAt:'12/4/20200'
    },
  ];
  constructor() { }
  public getRentals():Observable<Rental[]>{
    return new Observable<Rental[]>((observale)=>{
      setTimeout(() => {
        observale.next(this.rentals);
      }, 500);
    })
  }
  public getRentalById(rentalId:string):Observable<Rental>{
      return new Observable<Rental>((observer)=>{
          setTimeout(() => {
              const foundRental = this.rentals.find((rental)=>{
                return rental.id == rentalId;
              })
              observer.next(foundRental);
          }, 500);
      });
  }
}