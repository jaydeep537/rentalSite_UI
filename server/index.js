const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const config = require('./config/dev.js');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingsRoute = require('./routes/bookings')
mongoose.connect(config.DB_URL,
        { useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true}
        ).then(()=>{
            const fakeFb = new  FakeDb();
            //fakeFb.seedDb();
        })
        .catch(()=>console.log("Error In Connection"))
app.use(bodyParser.json())       
app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/booking',bookingsRoute)
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log("Node runnig...........",PORT);
})
