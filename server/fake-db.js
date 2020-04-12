const Rental =  require('./models/rental')
class FakeDb {
    constructor(){
        this.rental = [
            {
              id:"1",
              title:"Central Appartment",
              city:"New York",
              street:"Times Square",
              category:"Appartment",
              image:"http://via.placeholder.com/350x250",
              bedRooms:3,
              description:"Very Nice Appartment",
              dailyRate:45,
              shared:false,
              createdAt:'12/4/20200'
            },
            {
              id:"2",
              title:"Central Appartment",
              city:"New York",
              street:"Times Square",
              category:"Appartment",
              image:"http://via.placeholder.com/350x250",
              bedRooms:3,
              description:"Very Nice Appartment",
              dailyRate:35,
              shared:false,
              createdAt:'12/4/20200'
            },
            {
              id:"3",
              title:"Central Appartment",
              city:"New York",
              street:"Times Square",
              category:"Appartment",
              image:"http://via.placeholder.com/350x250",
              bedRooms:3,
              description:"Very Nice Appartment",
              dailyRate:55,
              shared:false,
              createdAt:'12/4/20200'
            },
            {
              id:"4",
              title:"Central Appartment",
              city:"New York",
              street:"Times Square",
              category:"Appartment",
              image:"http://via.placeholder.com/350x250",
              bedRooms:3,
              description:"Very Nice Appartment",
              dailyRate:95,
              shared:false,
              createdAt:'12/4/20200'
            },
          ]; 
    }
    async cleanDb (){
        await Rental.remove({});
    }
    pushRentalsToDb(){
        this.rental.forEach((rental)=>{
            const newRental = new Rental(rental)
            newRental.save();
        })
    }
    seedDb(){
        this.cleanDb();
        this.pushRentalsToDb();
    }
}
module.exports = FakeDb;