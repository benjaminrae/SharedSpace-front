import { Component, Input } from "@angular/core";
import { LocationsService } from "../../services/locations/locations.service";
import { LocationStructure } from "../../store/locations-feature/types";

@Component({
  selector: "app-location-card",
  templateUrl: "./location-card.component.html",
  styleUrls: ["./location-card.component.scss"],
})
export class LocationCardComponent {
  @Input() location!: LocationStructure;
  @Input() owner!: boolean;

  constructor(private readonly locationsService: LocationsService) {}

  deleteLocation() {
    this.locationsService.deleteLocation(this.location.id);
  }
}
