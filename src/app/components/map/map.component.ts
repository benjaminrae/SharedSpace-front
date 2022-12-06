import { Component, Input, OnInit } from "@angular/core";
import * as L from "leaflet";
import Geocoder from "leaflet-control-geocoder";
import { Locations } from "../../store/locations-feature/types";
import { GeolocationService } from "@ng-web-apis/geolocation";
import { LocationsService } from "../../services/locations/locations.service";
import { Observable } from "rxjs";

// TemplateUrl: "./map.component.html",
@Component({
  selector: "app-map",
  template: `<div id="map" data-testid="map"></div>`,
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() locations$!: Observable<Locations>;
  private map!: L.Map;
  private readonly geocoder!: Geocoder;
  private position!: GeolocationPosition;
  private readonly iconSize = [25, 41] as L.PointExpression;
  private readonly iconAnchor = [12, 41] as L.PointExpression;

  constructor(
    private readonly geolocation$: GeolocationService,
    private readonly locationsService: LocationsService
  ) {}

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
            iconSize: this.iconSize,
            iconAnchor: this.iconAnchor,
          }),
        }
      )
        .bindPopup("Your location")
        .addTo(this.map);
    });

    this.addMarkers();
  }

  addMarkers() {
    this.locations$?.subscribe((locations) => {
      locations.forEach((location) =>
        this.locationsService
          .getGeocodeInformation(location.location)
          .subscribe(({ results }) => {
            const [
              {
                geometry: { location: geocodeData },
              },
            ] = results;
            const marker = L.marker([geocodeData.lat, geocodeData.lng], {
              icon: L.icon({
                iconUrl: "assets/svgs/pin.svg",
                iconSize: this.iconSize,
                iconAnchor: this.iconAnchor,
              }),
            });
            const link = `<a href="/locations/${location.name}/${location.id}">${location.name}</a>`;
            marker.bindPopup(link);
            marker.addTo(this.map);
          })
      );
    });
  }

  getGeocodeLocation(location: string) {
    return this.geocoder.setQuery(location);
  }
}
