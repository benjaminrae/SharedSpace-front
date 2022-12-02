import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { LocationsService } from "../../services/locations/locations.service";
import { Locations } from "../../store/locations-feature/types";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"],
})
export class LocationListComponent {
  @Input() owner!: boolean;

  locations$!: Observable<Locations>;
  count$!: Observable<number>;
  next$!: Observable<string | undefined>;

  constructor(private readonly locationsService: LocationsService) {
    if (!this.owner) {
      locationsService.getLocations();
    }

    if (this.owner) {
      locationsService.getMyLocations();
    }

    this.locations$ = locationsService.selectLocations();
    this.count$ = locationsService.selectCount();
    this.next$ = locationsService.selectNext();
  }

  showMore() {
    this.next$.subscribe((data) => {
      this.locationsService.getNextLocations(data!);
    });
  }
}
