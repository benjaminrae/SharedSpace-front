import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { LocationsService } from "../../services/locations/locations.service";
import { Locations } from "../../store/locations-feature/types";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  locations$!: Observable<Locations>;
  count$!: Observable<number>;

  constructor(private readonly locationsService: LocationsService) {
    locationsService.getLocations();
    this.locations$ = locationsService.selectLocations();
    this.count$ = locationsService.selectCount();
  }
}
