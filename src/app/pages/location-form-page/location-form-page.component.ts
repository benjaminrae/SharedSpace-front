import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-location-form-page",
  templateUrl: "./location-form-page.component.html",
  styleUrls: ["./location-form-page.component.scss"],
})
export class LocationFormPageComponent {
  isEdit!: boolean;
  locationId!: string;
  params!: Record<string, string>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isEdit = this.router.url.startsWith("/edit-location");

    if (this.isEdit) {
      this.route.params.subscribe((params) => {
        this.params = params;
        this.locationId = this.params["locationId"];
      });
    }
  }
}
