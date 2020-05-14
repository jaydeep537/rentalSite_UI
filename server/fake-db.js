const Rental =  require('./models/rental')
const User = require('./models/user')
const Booking = require('./models/bookings');
const fakeDbData = require('./data.json');
class FakeDb {
  rentals = fakeDbData.rentals;
  users = fakeDbData.users;
    constructor(){}
    async cleanDb (){
      await User.deleteMany();  
      await Rental.deleteMany();
      await Booking.deleteMany();
    }
    pushDataToDb(){
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);
        this.rentals.forEach((rental)=>{
            const newRental = new Rental(rental)
            user.rentals.push(newRental);
            newRental.user = user;
            newRental.save();
        })
        user.save();
        user2.save();
    }
    async seedDb(){
        await this.cleanDb();
        this.pushDataToDb();
    }
}
module.exports = FakeDb;