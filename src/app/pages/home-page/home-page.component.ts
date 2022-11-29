import { Component } from "@angular/core";
import { getRandomLocations } from "../../factories/locationsFactory";
import { Locations } from "../../store/locations-feature/types";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  locations!: Locations;

  constructor() {
    this.locations = getRandomLocations(20);
  }
}
