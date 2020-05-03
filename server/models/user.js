const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const {saltRounds} = require('../config/dev')
const userSchema = new Schema({
    username:{ 
        type:String,
        min:[4,'Minimum  4 characters required in username'], 
        max:[32,'Maximum length should be 32 in username']
    },
    email:{ 
        type:String, 
        required:'Email is required',
        lowercase:true, 
        min:[4,'Minimum  4 characters required in email'], 
        max:[32,'Maximum length should be 32 in email'], 
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{ 
        type:String, 
        required:true, 
        min:[4,'Minimum  4 characters required in password'], 
        max:[32,'Maximum length should be 32 in password']
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
    bookings :[{type:Schema.Types.ObjectId , ref:'Booking'}]
})

userSchema.methods.isSamePassword = function isSamePassword(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.pre('save',function(next){
    const user = this;
    //console.log("pre called",user);
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('User',userSchema); 