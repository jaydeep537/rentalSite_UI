import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from '../../booking/booking.model'
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  private formatDate(date,dateFormat){
    return moment(date).format(dateFormat);
  }
  public formatBookingDate(date){
    return this.formatDate(date,Booking.BOOKING_FORMAT)
  }
  private getDateRenge(startAt,endAt,format){
    let dateRenge = [];
    const mEndDate = moment(endAt);
    let mStartDate = moment(startAt);
    while(mStartDate <= mEndDate){
      dateRenge.push(mStartDate.format(format));
      mStartDate = mStartDate.add(1,'day');
    }
    return dateRenge;
  }
  public getBookingDateRange(startAt,endAt){
      return this.getDateRenge(startAt,endAt,Booking.BOOKING_FORMAT)
  }
}
