const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking');
const UserController = require('../controllers/user');
router.post('',UserController.authMiddleware , BookingController.createBooking);
router.get('/manage',UserController.authMiddleware,BookingController.getUserBooking)
module.exports = router;