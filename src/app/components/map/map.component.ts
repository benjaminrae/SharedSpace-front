import { Component, Input } from "@angular/core";
import * as L from "leaflet";
import { Locations } from "../../store/locations-feature/types";
import { GeolocationService } from "@ng-web-apis/geolocation";
import { LocationsService } from "../../services/locations/locations.service";
import { Observable, take } from "rxjs";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent {
  @Input() locations$!: Observable<Locations>;
  isOpen = false;
  isInitialised = false;
  private map!: L.Map;
  private position!: GeolocationPosition;
  private readonly iconSize = [25, 41] as L.PointExpression;
  private readonly iconAnchor = [12, 41] as L.PointExpression;

  constructor(
    private readonly geolocation$: GeolocationService,
    private readonly locationsService: LocationsService
  ) {}

  createMap() {
    this.geolocation$.pipe(take(1)).subscribe({
      next: (position) => {
        this.position = position;

        this.map = L.map("map").setView(
          [this.position.coords.latitude, this.position.coords.longitude],
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
      },
      error: () => {
        this.map = L.map("map").setView([41.3874, 2.1686], 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(this.map);
      },
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

  toggleMap() {
    this.isOpen = !this.isOpen;

    if (this.isOpen && !this.isInitialised) {
      this.createMap();
      this.isInitialised = true;
    }
  }
}
