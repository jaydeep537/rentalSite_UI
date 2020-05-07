import { Component, OnInit, Input , ViewChild , ViewEncapsulation } from '@angular/core';
import { Booking } from '../../../booking/booking.model'
import { Rental } from '../../../shared/rental.model';
import { HelperService } from '../../../common/service/helper.service'; 
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../../booking/shared/booking.service'
import { ToastrService } from 'ngx-toastr';
import { DaterangepickerComponent } from 'ng2-daterangepicker';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() price:number;
  @Input() rental:Rental;
  @ViewChild(DaterangepickerComponent)
  private picker: DaterangepickerComponent;

  
  public daterange: any = {};
  options: any = {
    locale: { format: 'Y/MM/DD' },
    alwaysShowCalendars: false,
    opens:'left',
    isInvalidDate: this.checkForInvalidDates.bind(this),
    isCustomDate: this.checkForCustomDate.bind(this),
    autoUpdateInput:false
  };
  bookedDates:any[] = [];
  newBooking:Booking;
  modelRef:any;
  errors:any[] = [];
  constructor(private helperService:HelperService,
              private modalService:NgbModal,
              private bookingService:BookingService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getBookedOutDates()
    this.newBooking = new Booking();
  }
  checkForInvalidDates(date){
    //debugger;
    return this.bookedDates.includes(this.helperService.formatBookingDate(date)) || date.diff(moment(),'days') < 0;
  }
  checkForCustomDate(date){
    //console.log("Custom dates called",this.helperService.getBookingDateFormat(date));
    if(this.bookedDates.includes(this.helperService.formatBookingDate(date))){
      return 'mystyle';
    }
  }
   getBookedOutDates(){
     const bookings:Booking[] = this.rental.bookings;
    if(bookings && bookings.length > 0){
      bookings.forEach((value)=>{
        const rangeDates = this.helperService.getBookingDateRange(value.startAt,value.endAt);
        this.bookedDates.push(...rangeDates);
      })
    }
   }
   selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
    this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end,'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
  confirmBooking(content){
    this.errors = [];
    ///this.options.autoUpdateInput = true;
    this.modelRef = this.modalService.open(content);
  }
  reserveBooking(){
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (booking:any)=>{
        this.addBookedDates(booking);
        this.newBooking = new Booking()
        this.modelRef.close();
        this.resetDateRangePicker();
        this.toastr.success('Booking succesfully created , View your bookings in manage booking section','success');
      },
      (error)=>{
        this.errors = error.error.Errors;
      }
      )
  }
  addBookedDates(booking:any){
    const dateRange = this.helperService.getBookingDateRange(booking.startAt,booking.endAt);
    this.bookedDates.push(...dateRange)
  }
  resetDateRangePicker(){
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }
}
