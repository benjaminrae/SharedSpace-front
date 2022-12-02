import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LocationsService } from "../../services/locations/locations.service";
import { Locations } from "../../store/locations-feature/types";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"],
})
export class LocationListComponent implements OnInit {
  @Input() owner!: boolean;

  locations$!: Observable<Locations>;
  count$!: Observable<number>;
  next$!: Observable<string | undefined>;
  next!: string;

  constructor(private readonly locationsService: LocationsService) {}

  ngOnInit(): void {
    if (!this.owner) {
      this.locationsService.getLocations();
    }

    if (this.owner) {
      this.locationsService.getMyLocations();
    }

    this.locations$ = this.locationsService.selectLocations();
    this.count$ = this.locationsService.selectCount();
    this.next$ = this.locationsService.selectNext();
  }

  showMore() {
    this.next$.subscribe((data) => {
      if (data) {
        this.next = data;
      }
    });

    this.locationsService.getNextLocations(this.next);
  }
}
