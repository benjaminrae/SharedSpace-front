import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LocationsService } from "../../services/locations/locations.service";
import { Locations } from "../../store/locations-feature/types";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  locations$!: Observable<Locations>;
  count$!: Observable<number>;

  constructor(private readonly locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locationsService.getLocations();
    this.locations$ = this.locationsService.selectLocations();
    this.count$ = this.locationsService.selectCount();
  }
}
