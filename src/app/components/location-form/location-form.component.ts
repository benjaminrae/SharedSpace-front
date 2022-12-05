import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { LocationsService } from "../../services/locations/locations.service";
import { UiService } from "../../services/ui/ui.service";
import { Services } from "../../store/locations-feature/types";

@Component({
  selector: "app-location-form",
  templateUrl: "./location-form.component.html",
  styleUrls: ["./location-form.component.scss"],
})
export class LocationFormComponent implements OnInit {
  @Input() isEdit!: boolean;
  @Input() locationId!: string;
  file!: File;
  fileUrl!: SafeUrl;
  formData = new FormData();

  locationForm = this.fb.group({
    name: ["", [Validators.required]],
    location: ["", [Validators.required]],
    description: ["", [Validators.required]],
    image: ["", [Validators.required]],
    services: this.fb.group({
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
    }),
  });

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly fb: FormBuilder,
    private readonly uiService: UiService,
    private readonly locationService: LocationsService
  ) {}

  ngOnInit(): void {
    if (this.isEdit) {
      window.scrollTo(0, 0);
      this.locationService
        .getLocationById(this.locationId)
        .subscribe((data) => {
          this.locationForm.patchValue(
            {
              name: data.location.name,
              description: data.location.description,
              location: data.location.location,
              services: { ...data.location.services },
            },
            { emitEvent: true }
          );
          this.fileUrl = data.location.images.image;
          this.locationForm.controls.image.removeValidators(
            Validators.required
          );
          this.locationForm.enable();
        });
    }
  }

  submitForm() {
    this.uiService.showLoading();
    this.getFormData();

    const response$ = this.isEdit
      ? this.locationService.editLocation(this.formData, this.locationId)
      : this.locationService.addLocation(this.formData);

    response$.subscribe(async () => {
      this.uiService.showSuccessModal("Your location was saved successfully");
      this.uiService.hideLoading();
      await this.uiService.navigate(this.isEdit ? "/my-locations" : "/");
    });
  }

  getFormData() {
    if (this.file) {
      this.formData.append("image", this.file);
    }

    this.formData.append("name", this.locationForm.get("name")!.value!);
    this.formData.append("location", this.locationForm.get("location")!.value!);
    this.formData.append(
      "description",
      this.locationForm.get("description")!.value!
    );
    this.formData.append(
      "services",
      JSON.stringify({
        airConditioning: this.locationForm.get("services.airConditioning")!
          .value,
        allDayAccess: this.locationForm.get("services.allDayAccess")!.value,
        eventManagement: this.locationForm.get("services.eventManagement")!
          .value,
        freeTeaCoffee: this.locationForm.get("services.freeTeaCoffee")!.value,
        freeTrial: this.locationForm.get("services.freeTrial")!.value,
        kitchen: this.locationForm.get("services.kitchen")!.value,
        meetingRoom: this.locationForm.get("services.meetingRoom")!.value,
        parking: this.locationForm.get("services.parking")!.value,
        photocopier: this.locationForm.get("services.photocopier")!.value,
        printer: this.locationForm.get("services.printer")!.value,
        projector: this.locationForm.get("services.projector")!.value,
        reception: this.locationForm.get("services.reception")!.value,
        scanner: this.locationForm.get("services.scanner")!.value,
        tv: this.locationForm.get("services.tv")!.value,
        whiteboard: this.locationForm.get("services.whiteboard")!.value,
        wifi: this.locationForm.get("services.wifi")!.value,
      } as Services)
    );
  }

  onFileChange(event: Event) {
    if ((event.target as HTMLInputElement).files!.length > 0) {
      this.file = (event.target as HTMLInputElement).files![0];
    }

    const unsafeUrl = URL.createObjectURL(this.file);

    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);
  }
}
