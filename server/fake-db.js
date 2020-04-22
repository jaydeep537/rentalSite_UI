const Rental =  require('./models/rental')
class FakeDb {
    constructor(){
        this.rental = [{
      "title": "Nice view on ocean",
      "city": "San Francisco",
      "street": "Main street",
      "category": "condo",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 4,
      "shared": false,
      "description": "Very nice apartment in center of the city.",
      "dailyRate": 43
      },
      {
      "title": "Modern apartment in center",
      "city": "New York",
      "street": "Time Square",
      "category": "apartment",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 1,
      "shared": true,
      "description": "Very nice apartment in center of the city.",
      "dailyRate": 11
      },
      {
      "title": "Old house in nature",
      "city": "Spisska Nova Ves",
      "street": "Banicka 1",
      "category": "house",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 5,
      "shared": false,
      "description": "Very nice apartment in center of the city.",
      "dailyRate": 23
    },
    {
      "title": "Amazing modern place",
      "city": "San Francisco",
      "street": "Green street",
      "category": "house",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 2,
      "shared": false,
      "description": "Hiking routes 10 min walking away",
      "dailyRate": 140
      },
      {
      "title": "Apartment In China Town",
      "city": "San Francisco",
      "street": "Lombard Street",
      "category": "apartment",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 3,
      "shared": false,
      "description": "Very nice apartment in China Town",
      "dailyRate": 89
      },
      {
      "title": "House with Garden",
      "city": "New York",
      "street": "Long Island, Queens",
      "category": "house",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 6,
      "shared": false,
      "description": "Very nice house in Long Island with garden",
      "dailyRate": 189
    },
    {
      "title": "Cozy modern Condo",
      "city": "New York",
      "street": "Penn Station",
      "category": "condo",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 3,
      "shared": true,
      "description": "Building close to Penn Station",
      "dailyRate": 68
    },
    {
      "title": "Hotel with Garden",
      "city": "Gandhinagar",
      "street": "Infocity",
      "category": "house",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 6,
      "shared": false,
      "description": "Very nice house in Long Island with garden",
      "dailyRate": 189
    }
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