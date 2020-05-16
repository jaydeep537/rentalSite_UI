import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router' 
import { RentalService} from '../shared/rental.service'
import { Rental } from 'src/app/rental/shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http'
@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.css']
})
export class RentalSearchComponent implements OnInit {
  rentals:Rental[] = [];
  errors:any[] = [];
  city:String;
  constructor(private route:ActivatedRoute , private rentalService:RentalService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
        console.log(params);
        this.city = params['city'];
        this.searchRentals()
    })
  }
  searchRentals(){
      this.rentals = [];
      this.errors = [];
      this.rentalService.searchRentalsByCity(this.city).subscribe(
        (searchRentals:Rental[])=>{
          console.log("Search Rentals",searchRentals)
          this.rentals = searchRentals;
        },
        (error:HttpErrorResponse)=>{
          this.errors = error.error.Errors;
          console.log(this.errors)
          console.log(error)}
        )
  }
}
