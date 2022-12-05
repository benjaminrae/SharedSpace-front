import { Component, Input, OnInit } from "@angular/core";
import * as L from "leaflet";
import Geocoder from "leaflet-control-geocoder";
import { Locations } from "src/app/store/locations-feature/types";
import { GeolocationService } from "@ng-web-apis/geolocation";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() locations?: Locations;
  private map!: L.Map;
  private readonly geocoder!: Geocoder;
  private position!: GeolocationPosition;

  constructor(private readonly geolocation$: GeolocationService) {}

  ngOnInit() {
    this.geolocation$.subscribe((position) => {
      this.position = position;

      this.map = L.map("map").setView(
        [
          this.position.coords.latitude || 41.3874,
          this.position.coords.longitude || 2.1686,
        ],
        12
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);

      L.marker(
        [this.position.coords.latitude, this.position.coords.longitude],
        {
          icon: L.icon({
            iconUrl: "assets/svgs/position.svg",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        }
      ).addTo(this.map);
    });
  }

  addMarkers() {
    // This.locations?.forEach((location) => {
    //   const marker = L.marker([location.lat, location.lng], {
    //     icon: L.icon({
    //       iconUrl: "assets/svgs/pin.svg",
    //       iconSize: [25, 41],
    //       iconAnchor: [12, 41],
    //     }),
    //   });
    //   marker.bindPopup(location.name);
    //   marker.addTo(this.map);
    // });
  }

  getGeocodeLocation(location: string) {
    return this.geocoder.setQuery(location);
  }
}
