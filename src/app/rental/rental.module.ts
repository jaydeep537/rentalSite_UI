import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalRoutingModule } from '../rental-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipes/uppercase.pipe'
@NgModule({
    declarations:[
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe
    ],
    imports:[
        CommonModule,
        RentalRoutingModule,
        HttpClientModule,
        NgPipesModule
    ]
})
export class RentalModule{}
