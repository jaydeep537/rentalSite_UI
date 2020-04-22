import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { CamelizePipe } from 'ngx-pipes';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MapComponent
  ],
  providers:[
    CamelizePipe
  ]
})
export class MapModule { }
