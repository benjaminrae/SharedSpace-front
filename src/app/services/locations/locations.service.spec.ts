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
});
