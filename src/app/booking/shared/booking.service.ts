import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { Booking } from '../booking.model'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  public createBooking(booking:Booking){
    return this.http.post('/api/v1/booking',booking);
  }
}
