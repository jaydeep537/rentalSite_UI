const express = require('express');
const mongoose =require('mongoose');
const app = express();
const config = require('./config/dev.js');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');
mongoose.connect(config.DB_URL,
        { useUnifiedTopology:true,useNewUrlParser:true }
        ).then(()=>{
            const fakeFb = new  FakeDb();
            fakeFb.seedDb();
        })
        .catch(()=>console.log("Error In Connection"))
app.use('/api/v1/rentals',rentalRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log("Node runnig...........",PORT);
})