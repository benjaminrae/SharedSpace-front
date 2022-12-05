import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { LocationsService } from "../../services/locations/locations.service";
import { UiService } from "../../services/ui/ui.service";
import { LocationStructure } from "../../store/locations-feature/types";

@Component({
  selector: "app-location-page",
  templateUrl: "./location-page.component.html",
  styleUrls: ["./location-page.component.scss"],
})
export class LocationPageComponent implements OnInit {
  location$!: Observable<{ location: LocationStructure }>;
  location!: LocationStructure;
  params!: Record<string, string>;
  id$!: Observable<string>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly locationsService: LocationsService,
    private readonly uiService: UiService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.uiService.showLoading();
    this.route.params.subscribe((params) => {
      this.params = params;

      this.location$ = this.locationsService.getLocationById(
        this.params["locationId"]
      );

      this.location$.subscribe((data) => {
        this.location = data.location;

        this.uiService.hideLoading();
      });
    });

    this.id$ = this.userService.getUserId();
  }

  separateKeys(keyInCamelCase: string): string {
    return keyInCamelCase
      .charAt(0)
      .toUpperCase()
      .concat(keyInCamelCase.slice(1))
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  }

  async deleteLocation() {
    this.locationsService.deleteLocation(this.location.id);
    await this.uiService.navigate("/");
  }
}
