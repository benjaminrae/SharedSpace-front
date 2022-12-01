import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Locations } from "src/app/store/locations-feature/types";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"],
})
export class LocationListComponent {
  @Input() locations$!: Observable<Locations>;
  @Input() count$!: Observable<number>;
  @Input() owner!: boolean;
}
