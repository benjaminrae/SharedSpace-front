import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UiService } from "../ui/ui.service";
import { environment } from "../../../environments/environment";
import { LocationsState } from "../../store/locations-feature/types";
import { catchError, throwError } from "rxjs";
import { loadLocations } from "../../store/locations-feature/locations-feature.actions";
import { selectLocations } from "../../store/locations-feature/locations-feature.reducer";

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
    this.uiService.showLoading();

    const locations$ = this.http
      .get<LocationsState>(`${apiUrl}${this.paths.locations}`)
      .pipe(catchError((error) => this.handleError(error, this.uiService)));

    locations$.subscribe((data) => {
      this.store.dispatch(loadLocations({ payload: data }));
      this.uiService.hideLoading();
    });
  }

  selectLocations() {
    return this.store.select(selectLocations);
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
