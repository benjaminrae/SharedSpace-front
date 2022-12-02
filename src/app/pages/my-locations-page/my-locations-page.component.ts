import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LocationsService } from "../../services/locations/locations.service";
import { Locations } from "../../store/locations-feature/types";

@Component({
  selector: "app-my-locations-page",
  templateUrl: "./my-locations-page.component.html",
  styleUrls: ["./my-locations-page.component.scss"],
})
export class MyLocationsPageComponent implements OnInit {
  locations$!: Observable<Locations>;
  count$!: Observable<number>;

  constructor(private readonly locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locationsService.getMyLocations();
    this.locations$ = this.locationsService.selectLocations();
    this.count$ = this.locationsService.selectCount();
  }
}
