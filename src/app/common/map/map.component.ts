import { Component, OnInit , Input} from '@angular/core';
import { MapService } from './map.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() location;
  rentalMap:mapboxgl.Map;
  rentalMarker = new mapboxgl.Marker;
  constructor(private MapService:MapService) { }

  ngOnInit(): void {
    mapboxgl.accessToken = environment.mapboxKey;
      this.rentalMap = new mapboxgl.Map({
        container: 'rental-map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // starting position
        zoom: 9 // starting zoom
      });
      this.rentalMap.addControl(new mapboxgl.NavigationControl());
    this.rentalMap.on('load',()=>{
      console.log("Map loaded");
      this.getGeocode();
    })
  }
  
  getGeocode(){

    this.MapService.getGeocodeLocation(this.location).subscribe(
      res =>{
      console.log("Res",res);
      this.rentalMap.setCenter([res.features[0].geometry.coordinates[0],res.features[0].geometry.coordinates[1]])
      this.rentalMarker.setLngLat([res.features[0].geometry.coordinates[0],res.features[0].geometry.coordinates[1]]).addTo(this.rentalMap);
      this.rentalMap.setZoom(11);
    },
    error =>{ console.log("Errr",error) }
    )
  }
}
