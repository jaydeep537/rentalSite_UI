import { Rental } from '../rental/shared/rental.model'
export class Booking {
    static readonly BOOKING_FORMAT = 'Y-MM-DD';
    _id:String;
    startAt:String;
    endAt:String;
    totalPrice:number;
    guests:number;
    days:number;
    createdAt:string
    rental:Rental
}