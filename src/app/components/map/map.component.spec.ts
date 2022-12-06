import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen, waitFor } from "@testing-library/angular";
import { of } from "rxjs";
import { getRandomLocations } from "../../factories/locationsFactory";
import { MapComponent } from "./map.component";
import { GeolocationService } from "@ng-web-apis/geolocation";
import { createMock } from "@testing-library/angular/jest-utils";
import { LocationsService } from "../../services/locations/locations.service";
import {
  Geometry,
  GoogleGeocodeResponse,
  GoogleGeocodeResult,
} from "src/app/services/locations/types";
import userEvent from "@testing-library/user-event";

const mockGeolocation = {
  getCurrentPosition: jest
    .fn()
    .mockImplementation(
      async (success: (position: GeolocationPosition) => void) =>
        Promise.resolve(
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          success({
            coords: {
              latitude: 10,
              longitude: 10,
            },
          } as GeolocationPosition)
        )
    ),
};

(global as any).navigator.geolocation = mockGeolocation;

const geolocationService = createMock(GeolocationService);

geolocationService.pipe = jest.fn().mockReturnValue({
  subscribe: jest.fn().mockImplementation((position) => ({
    next: jest
      .fn()
      .mockImplementation(
        (callback: (position: GeolocationPosition) => void) => {
          callback(position);
        }
      ),
    error: jest.fn().mockImplementation((callback: () => void) => {
      callback();
    }),
  })),
});

const geometry: Geometry = {
  location: { lat: 10, lng: 10 },
  bounds: { northeast: { lat: 10, lng: 10 }, southwest: { lat: 10, lng: 10 } },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  location_type: "",
  viewport: {
    northeast: { lat: 10, lng: 10 },
    southwest: { lat: 10, lng: 10 },
  },
};

const geocodeResponse: Partial<GoogleGeocodeResponse> = {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  results: [{ geometry } as GoogleGeocodeResult],
  status: "200",
};

const locationService = createMock(LocationsService);
locationService.getGeocodeInformation = jest.fn().mockReturnValue({
  geocodeResponse: { results: [{ geometry }] },
  subscribe: jest
    .fn()
    .mockImplementation(
      (callback: (geocodeResponse: GoogleGeocodeResponse) => void) => {
        callback(geocodeResponse as GoogleGeocodeResponse);
      }
    ),
});

const count = 10;
const locations = getRandomLocations(count);

describe("Given a MapComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a button with 'Map' which shows a map when clicked", async () => {
      const mapLabel = /map/i;
      const mapTestId = "map";

      await render(MapComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        componentProperties: {
          locations$: of(locations),
        },
        componentProviders: [
          { provide: GeolocationService, useValue: geolocationService },
          { provide: LocationsService, useValue: locationService },
        ],
        detectChanges: true,
      });

      const mapButton = screen.queryByRole("button", {
        name: mapLabel,
      });

      expect(mapButton).toBeInTheDocument();

      await userEvent.click(mapButton!);

      screen.debug();

      await waitFor(() => {
        const map = screen.queryByTestId(mapTestId);

        expect(map).toBeInTheDocument();
      });
    });
  });
});
