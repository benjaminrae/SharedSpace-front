import { Component, Input } from "@angular/core";
import { LocationStructure } from "../../store/locations-feature/types";

@Component({
  selector: "app-location-card",
  templateUrl: "./location-card.component.html",
  styleUrls: ["./location-card.component.scss"],
})
export class LocationCardComponent {
  @Input() location!: LocationStructure;
  @Input() owner!: boolean;
}
