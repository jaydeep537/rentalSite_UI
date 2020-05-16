import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {
  newRantal:Rental;
  rentalCategories:any[] = [];
  errors:HttpErrorResponse[]= [];
  constructor(private rentalService:RentalService,private router:Router) { }

  ngOnInit(): void {
    this.newRantal = new Rental();
    this.newRantal.shared = false;
    this.rentalCategories = Rental.CATEGORIES;
    console.log("New Rental ", this.rentalCategories)
  }
  createRental(){
    console.log("Create Rental calld",this.newRantal);
    this.rentalService.createRental(this.newRantal).subscribe(
    (rental:Rental)=>{
        console.log("Inside Rental create response",rental);
        this.router.navigate([`/rentals/${rental._id}`])
    },
    (error:HttpErrorResponse)=>{this.errors = error.error.Errors}
    )
  }
  changeImageHandler(){
    console.log("Change image handler called");
    this.newRantal.image = 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg';
  }
}
