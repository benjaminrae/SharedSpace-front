import { HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { getRandomLocations } from "../../factories/locationsFactory";
import { environment } from "../../../environments/environment.prod";
import { LocationsService } from "./locations.service";

const { apiUrl } = environment;

const providers = [provideMockStore({})];

const serverErrorMessage = "There was an error on the server";
const clientErrorMessage = "Incorrect username or password";
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

      const locations$ = service.getLocations();

      locations$.subscribe((data) => {
        expect(data.locations).toStrictEqual(locations);
      });

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

      const response$ = service.getLocations();

      response$.subscribe();

      const mockRequest = httpMock.expectOne(`${apiUrl}/locations`);

      mockRequest.flush("", { status: 500, statusText: "" });

      expect(mockRequest.request.method).toBe("GET");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });
});
