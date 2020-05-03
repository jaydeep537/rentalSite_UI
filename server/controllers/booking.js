const Rental = require('../models/rental')
const { normalizeErrors } = require('../helpers/mongoose')
const Booking = require('../models/bookings')
const moment = require('moment');
const User = require('../models/user');

exports.createBooking = (req,res)=>{
    const {startAt , endAt , totalPrice , guests , days , rental} = req.body;
    const user = res.locals.user;   
    const booking = new Booking({startAt , endAt , totalPrice , guests , days})
    Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err,foundRental){
        if(err){
            return res.status(422).send(normalizeErrors(err.errors))
        }
        if(foundRental.user.id==user.id){
            return res.status(422).send({Errors:[
                {title:'Invalid User',detail:'You can not create bookings on own rental..!'}
            ]})
        }
        if(isValidBooking(booking,foundRental)){
            foundRental.bookings.push(booking);
            
            booking.rental = foundRental;
            booking.user = user;
            booking.save((err)=>{
                if(err){
                    return res.status(422).send(normalizeErrors(err.errors)); 
                }
                foundRental.save();
                User.update({_id:user.id},{$push:{bookings:booking}},()=>{})
            })
            res.json({startAt,endAt})
        }else{
            return res.status(422).send({Errors:[
                {title:'Invalid Booking',detail:'Property already booked for given dates..!'}
            ]})
        }
    })
    const isValidBooking = (proposedBooking,rental)=>{
        let isValid = true;
        if(rental.bookings && rental.bookings.length > 0){
            isValid = rental.bookings.every((booking)=>{
                const proposedStart = moment(proposedBooking.startAt);
                const proposedEnd = moment(proposedBooking.endAt);
                const actualStart = moment(booking.startAt);
                const actualEnd = moment(booking.endAt);  
                return (actualStart < proposedStart && actualEnd < proposedStart) || ( proposedEnd < actualStart && proposedEnd < actualEnd);
            })  
        }
        return isValid; 
    }    
}