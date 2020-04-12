const express = require('express');
const router = express.Router();
const RentalModel = require('../models/rental');
router.get('',(req,res)=>{
    RentalModel.find({},(error,foundRentals)=>{
        console.log("Find All");
        res.json(foundRentals);
    });
});

router.get('/:rentalId',(req,res)=>{
    const rentalId = req.params.rentalId;
    console.log("Inside Find By ID" ,rentalId);
    RentalModel.findById(rentalId,(error,foundRentalById)=>{
        if(error){
            res.status(404).send({Errors:[
                {title:'Rental Error',detail:'Rental not found...!'}
            ]})
        }
        res.json(foundRentalById);
    });
});

module.exports = router;