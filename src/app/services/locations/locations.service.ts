import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UiService } from "../ui/ui.service";
import { environment } from "../../../environments/environment";
import {
  LocationsState,
  LocationStructure,
} from "../../store/locations-feature/types";
import { catchError, Observable, throwError } from "rxjs";
import {
  deleteLocation,
  loadLocations,
  loadMoreLocations,
} from "../../store/locations-feature/locations-feature.actions";
import {
  selectCount,
  selectLocations,
  selectNext,
} from "../../store/locations-feature/locations-feature.reducer";
import { selectToken } from "../../store/user-feature/user-feature.reducer";
import { GoogleGeocodeResponse } from "./types";

const { apiUrl, agmApiKey } = environment;

@Injectable({
  providedIn: "root",
})
export class LocationsService {
  page = 1;

  private readonly paths = {
    locations: "/locations",
    location: "/location",
    add: "/add",
    myLocations: "/my-locations",
    deleteLocation: "/delete-location",
    editLocation: "/edit-location",
  };

  private token$!: Observable<string>;
  private token!: string;

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

  getNextLocations(url: string) {
    this.uiService.showLoading();

    const locations$ = this.http
      .get<LocationsState>(`${url}`, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: this.getBearerToken(),
        },
      })
      .pipe(catchError((error) => this.handleError(error, this.uiService)));

    locations$.subscribe((data) => {
      this.store.dispatch(loadMoreLocations({ payload: data }));
      this.uiService.hideLoading();
    });
  }

  addLocation(formData: FormData) {
    return this.http
      .post(`${apiUrl}${this.paths.locations}${this.paths.add}`, formData, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: this.getBearerToken(),
        },
      })
      .pipe(catchError((error) => this.handleError(error, this.uiService)));
  }

  editLocation(formData: FormData, locationId: string) {
    return this.http
      .put(
        `${apiUrl}${this.paths.locations}${this.paths.editLocation}/${locationId}`,
        formData,
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: this.getBearerToken(),
          },
        }
      )
      .pipe(catchError((error) => this.handleError(error, this.uiService)));
  }

  selectLocations() {
    return this.store.select(selectLocations);
  }

  selectCount() {
    return this.store.select(selectCount);
  }

  selectNext() {
    return this.store.select(selectNext);
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

  deleteLocation(locationId: string) {
    this.uiService.showLoading();
    const response$ = this.http
      .delete<{ message: string }>(
        `${apiUrl}${this.paths.locations}${this.paths.deleteLocation}/${locationId}`,
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: this.getBearerToken(),
          },
        }
      )
      .pipe(catchError((error) => this.handleError(error, this.uiService)));

    response$.subscribe((data) => {
      this.uiService.hideLoading();
      this.uiService.showSuccessModal(data.message);
      this.store.dispatch(deleteLocation({ payload: locationId }));
    });
  }

  getBearerToken() {
    this.token$ = this.store.select(selectToken);

    this.token$.subscribe((data) => {
      this.token = data;
    });

    return `Bearer ${this.token}`;
  }

  getMyLocations() {
    this.uiService.showLoading();

    const locations$ = this.http
      .get<LocationsState>(
        `${apiUrl}${this.paths.locations}${this.paths.myLocations}`,
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: this.getBearerToken(),
          },
        }
      )
      .pipe(catchError((error) => this.handleError(error, this.uiService)));

    locations$.subscribe((data) => {
      this.store.dispatch(loadLocations({ payload: data }));
      this.uiService.hideLoading();
    });
  }

  getLocationById(locationId: string) {
    return this.http
      .get<{ location: LocationStructure }>(
        `${apiUrl}${this.paths.locations}${this.paths.location}/${locationId}`
      )
      .pipe(catchError((error) => this.handleError(error, this.uiService)));
  }

  getFilteredLocations(queryParams: string) {
    this.uiService.showLoading();

    const locations$ = this.http
      .get<LocationsState>(`${apiUrl}${this.paths.locations}${queryParams}`)
      .pipe(catchError((error) => this.handleError(error, this.uiService)));

    locations$.subscribe((data) => {
      this.store.dispatch(loadLocations({ payload: data }));
      this.uiService.hideLoading();
    });
  }

  getGeocodeInformation(location: string) {
    return this.http.get<GoogleGeocodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${agmApiKey}`
    );
  }
}
