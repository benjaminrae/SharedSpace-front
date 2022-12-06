import { HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import {
  getRandomLocation,
  getRandomLocations,
} from "../../factories/locationsFactory";
import { environment } from "../../../environments/environment.prod";
import { LocationsService } from "./locations.service";
import { createMock } from "@testing-library/angular/jest-utils";
import { UiService } from "../ui/ui.service";
import { throwError } from "rxjs";
import { GoogleGeocodeResponse } from "./types";

const { apiUrl } = environment;

const providers = [provideMockStore({})];

const serverErrorMessage = "There was an error on the server";
const clientErrorMessage = "Bad request";
const serverError: Partial<HttpErrorResponse> = {
  message: serverErrorMessage,
  error: {
    error: "",
  },
};
const clientError: Partial<HttpErrorResponse> = {
  error: {
    error: clientErrorMessage,
  },
};
const serverCallback = () => serverError;
const clientCallback = () => clientError;

jest.mock("rxjs", (): unknown => ({
  ...jest.requireActual("rxjs"),
  throwError: jest
    .fn()
    .mockImplementationOnce((callback: () => typeof clientCallback) => {
      callback();
    })
    .mockImplementationOnce((callback: typeof serverCallback) => {
      callback();
    }),
}));

describe("Given the service Locations Service", () => {
  let service: LocationsService;

  const locations = getRandomLocations(3);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers,
    });
    service = TestBed.inject(LocationsService);
  });

  describe("When its method getLocations is invoked ", () => {
    test("Then it should return an observable with a list of locations", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      service.getLocations();

      const mockRequest = httpMock.expectOne(`${apiUrl}/locations`);

      mockRequest.flush({ locations });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();
    });
  });

  describe("When its method getLocations is invoked and the server returns 500", () => {
    test("Then handleError should be called", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const handleError = jest.spyOn(service, "handleError");

      service.getLocations();

      const mockRequest = httpMock.expectOne(`${apiUrl}/locations`);

      mockRequest.flush("", { status: 500, statusText: "" });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When the method handleError is invoked with a HttpErrorResponse with 'Bad request' and the UiService", () => {
    test("Then UiService's showLoading and showErrorModal with the received error should be invoked and it should return a thrown error", () => {
      const uiService = createMock(UiService);

      service.handleError(clientError as HttpErrorResponse, uiService);

      expect(uiService.hideLoading).toHaveBeenCalled();
      expect(uiService.showErrorModal).toHaveBeenCalledWith(clientErrorMessage);
      expect(throwError).toHaveBeenCalled();
    });
  });

  describe("When the method handleError is invoked with a HttpErrorResponse with 'There was an error on the server' and the UiService", () => {
    test("Then UiService's showLoading and showErrorModal with the received error should be invoked and it should return a thrown error", () => {
      const uiService = createMock(UiService);

      service.handleError(serverError as HttpErrorResponse, uiService);

      expect(uiService.hideLoading).toHaveBeenCalled();
      expect(uiService.showErrorModal).toHaveBeenCalledWith(serverErrorMessage);
      expect(throwError).toHaveBeenCalled();
    });
  });

  describe("When the method addLocation is called with a new location and image", () => {
    test("Then it should return an observable with the new location", () => {
      const newLocation = getRandomLocation();
      const image = new File(["image"], "image.png", {
        type: "image/png",
      });

      const formData = new FormData();

      formData.append("name", newLocation.name);
      formData.append("description", newLocation.description);
      formData.append("location", newLocation.location);
      formData.append("image", image);

      const httpMock = TestBed.inject(HttpTestingController);

      const newLocation$ = service.addLocation(formData);

      newLocation$.subscribe((data) => {
        expect(data).toStrictEqual({ location: newLocation });
      });

      const mockRequest = httpMock.expectOne(`${apiUrl}/locations/add`);

      mockRequest.flush({ location: newLocation });

      expect(mockRequest.request.method).toBe("POST");

      httpMock.verify();
    });
  });

  describe("When its method addLocation is invoked and the server returns 409", () => {
    test("Then handleError should be called", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const handleError = jest.spyOn(service, "handleError");

      const error$ = service.addLocation(new FormData());

      error$.subscribe();

      const mockRequest = httpMock.expectOne(`${apiUrl}/locations/add`);

      mockRequest.flush("", { status: 409, statusText: "" });

      expect(mockRequest.request.method).toBe("POST");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When its method getMyLocations is invoked ", () => {
    test("Then it should return an observable with a list of locations", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      service.getMyLocations();

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/my-locations`
      );

      mockRequest.flush({ locations });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();
    });
  });

  describe("When its method getMyLocations is invoked and the server returns 500", () => {
    test("Then handleError should be called", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const handleError = jest.spyOn(service, "handleError");

      service.getMyLocations();

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/my-locations`
      );

      mockRequest.flush("", { status: 500, statusText: "" });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When its method deleteLocation is invoked with id: '1234'", () => {
    test("Then it should return a message 'Location successfully deleted'", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const idToDelete = "1234";
      service.deleteLocation(idToDelete);
      const message = "Location successfully deleted";

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/delete-location/${idToDelete}`
      );

      mockRequest.flush({ message });

      expect(mockRequest.request.method).toBe("DELETE");

      httpMock.verify();
    });
  });

  describe("When its method deleteLocation is invoked with id: '1234' and the server responds with status 400", () => {
    test("Then handleError should be called", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const handleError = jest.spyOn(service, "handleError");

      const idToDelete = "1234";
      service.deleteLocation(idToDelete);

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/delete-location/${idToDelete}`
      );

      mockRequest.flush("", { status: 400, statusText: "" });

      expect(mockRequest.request.method).toBe("DELETE");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When its method getNextLocations is invoked with 'nextlocations.com' ", () => {
    test("Then it should return an observable with a list of locations after making a request to that link", () => {
      const httpMock = TestBed.inject(HttpTestingController);
      const requestLink = "nextlocations.com";

      service.getNextLocations(requestLink);

      const mockRequest = httpMock.expectOne(requestLink);

      mockRequest.flush({ locations });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();
    });
  });

  describe("When its method getNextLocations is invoked and the server returns 500", () => {
    test("Then handleError should be called", () => {
      const httpMock = TestBed.inject(HttpTestingController);
      const requestLink = "nextlocations.com";

      const handleError = jest.spyOn(service, "handleError");

      service.getNextLocations(requestLink);

      const mockRequest = httpMock.expectOne(requestLink);

      mockRequest.flush("", { status: 500, statusText: "" });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When its method getLocationById is invoked with id '12345'", () => {
    test("Then it should make a GET request to the correct URL", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const locationId = "12345";

      const location$ = service.getLocationById(locationId);

      location$.subscribe();

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/location/${locationId}`
      );

      mockRequest.flush({ location });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();
    });
  });

  describe("When its method getLocationById is invoked and the server responds with status 404", () => {
    test("Then handleError should have been called", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const locationId = "12345";

      const location$ = service.getLocationById(locationId);

      location$.subscribe();

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/location/${locationId}`
      );

      mockRequest.flush("", { status: 404, statusText: "" });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();
    });
  });

  describe("When its method getFilteredLocations is invoked with '?services=wifi,airConditioning'", () => {
    test("Then it should return an observable with a list of locations", () => {
      const queryParams = "?services=wifi,airConditioning";

      const httpMock = TestBed.inject(HttpTestingController);

      service.getFilteredLocations(queryParams);

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations${queryParams}`
      );

      mockRequest.flush({ locations });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();
    });
  });

  describe("When its method getFilteredLocations is invoked and the server returns 500", () => {
    test("Then handleError should be called", () => {
      const queryParams = "?services=wifi,airConditioning";

      const httpMock = TestBed.inject(HttpTestingController);

      service.getFilteredLocations(queryParams);

      const handleError = jest.spyOn(service, "handleError");

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations${queryParams}`
      );
      mockRequest.flush("", { status: 500, statusText: "" });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("Given its method addLocation is invoked with location form data and a location id", () => {
    test("Then it should emit a put request to the correct url", async () => {
      const newLocation = getRandomLocation();
      const image = new File(["image"], "image.png", {
        type: "image/png",
      });

      const formData = new FormData();

      formData.append("name", newLocation.name);
      formData.append("description", newLocation.description);
      formData.append("location", newLocation.location);
      formData.append("image", image);

      const httpMock = TestBed.inject(HttpTestingController);

      const editedLocation$ = service.editLocation(formData, newLocation.id);

      editedLocation$.subscribe((data) => {
        expect(data).toStrictEqual({ location: newLocation });
      });

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/edit-location/${newLocation.id}`
      );

      mockRequest.flush({ location: newLocation });

      expect(mockRequest.request.method).toBe("PUT");

      httpMock.verify();
    });
  });

  describe("When its method editLocation is invoked and the server returns 500", () => {
    test("Then handleError should be called", () => {
      const newLocation = getRandomLocation();

      const httpMock = TestBed.inject(HttpTestingController);

      const handleError = jest.spyOn(service, "handleError");

      const error$ = service.editLocation(new FormData(), newLocation.id);

      error$.subscribe();

      const mockRequest = httpMock.expectOne(
        `${apiUrl}/locations/edit-location/${newLocation.id}`
      );

      mockRequest.flush("", { status: 500, statusText: "" });

      expect(mockRequest.request.method).toBe("PUT");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When it's method getGeocodeInformation is invoked with location Barcelona", () => {
    test("Then it should emit a GET request to the correct url", () => {
      const httpMock = TestBed.inject(HttpTestingController);
      const location = "Barcelona";

      const geocodeData: Partial<GoogleGeocodeResponse> = {
        results: [],
        status: "200",
      };

      const geocodeInformation$ = service.getGeocodeInformation(location);

      geocodeInformation$.subscribe((data) => {
        expect(data).toStrictEqual(geocodeData);
      });

      const mockRequest = httpMock.expectOne(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCHJldnFuYLDsuaf8jVoadU0D4d592c5VU`
      );

      mockRequest.flush(geocodeData);

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();
    });
  });
});
