import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { LocationsService } from "../../services/locations/locations.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent {
  isOpen = false;
  services = this.fb.group({
    airConditioning: false,
    allDayAccess: false,
    eventManagement: false,
    freeTeaCoffee: false,
    freeTrial: false,
    kitchen: false,
    meetingRoom: false,
    parking: false,
    photocopier: false,
    printer: false,
    projector: false,
    reception: false,
    scanner: false,
    tv: false,
    whiteboard: false,
    wifi: false,
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly locationsService: LocationsService
  ) {}

  toggleFilter() {
    this.isOpen = !this.isOpen;
  }

  resetFilters() {
    this.services.reset();

    this.filterChange();
  }

  filterChange() {
    const keys = Object.entries(this.services.value)
      .filter(([, value]) => value === true)
      .map(([key]) => key);

    this.locationsService.getFilteredLocations(`?services=${keys.join(",")}`);
  }
}
