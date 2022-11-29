import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UiService } from "../ui/ui.service";
import { environment } from "../../../environments/environment";
import { Locations } from "../../store/locations-feature/types";
import { catchError, throwError } from "rxjs";

const { apiUrl } = environment;

@Injectable({
  providedIn: "root",
})
export class LocationsService {
  private readonly paths = { locations: "/locations" };

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly uiService: UiService
  ) {}

  getLocations() {
    return this.http
      .get<{ locations: Locations }>(`${apiUrl}${this.paths.locations}`)
      .pipe(catchError((error) => this.handleError(error, this.uiService)));
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error.error) {
      uiService.showErrorModal(error.error.error);
      return throwError(() => error);
    }

    if (error.message) {
      uiService.showErrorModal(error.message);
    }

    return throwError(() => new Error(error.message));
  }
}
