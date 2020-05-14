const express = require('express');
const router = express.Router();
const RentalModel = require('../models/rental');
const userCntrl = require('../controllers/user');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
router.get('/secretRoute',userCntrl.authMiddleware,(req,res)=>{
    res.json({secret:true})
})

router.get('/:rentalId',(req,res)=>{
    const rentalId = req.params.rentalId;
    //console.log("Inside Find By ID" ,rentalId);
    RentalModel.findById(rentalId)
    .populate('bookings','startAt endAt -_id')
    .populate('user','username -_id')
    .exec((error,foundRentalById)=>{
        if(error){
                res.status(404).send({Errors:[
                    {title:'Rental Error',detail:'Rental not found...!'}
                ]})
            }
            res.json(foundRentalById);
    });
});
router.post('', userCntrl.authMiddleware , (req,res)=>{
    const {title,city,street,category,image,bedrooms,shared,description,dailyRate} = req.body;
    const user = res.locals.user;
    const rental = new RentalModel({title,city,street,category,image,bedrooms,shared,description,dailyRate})
    rental.user = user;
    RentalModel.create(rental,(err,createdRental)=>{
        if(err){
            return res.status(422).send(normalizeErrors(err.errors));
        }
        User.update({_id:user.id},{$push:{rentals:createdRental}},()=>{});
        //console.log("Rental Created",err,createdRental)  
        return res.json(createdRental) 
    })
})
router.get('',(req,res)=>{
    const city = req.query.city;
    const query = city ? {city:city.toLowerCase()}:{}
    RentalModel.find(query)
    .select('-bookings')
    .exec((error,foundRentals)=>{
        if(error){
            return res.status(422).send(normalizeErrors(error.errors));
        }
        if(city && foundRentals.length==0){
            return res.status(404).send({Errors:[
                {title:'Rental not found',detail:`Rental not found with city ${city}`}
            ]})
        }
        return res.json(foundRentals);
    })
});
module.exports = router;