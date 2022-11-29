import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { getMockStore, provideMockStore } from "@ngrx/store/testing";
import {
  RegisterUserCredentials,
  User,
  UserCredentials,
} from "src/app/store/user-feature/types";
import { UserService } from "./user.service";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UiService } from "../ui/ui.service";
import { ApplicationState } from "../../store/types";
import mockInitialUiState from "../../mocks/states/mockInitialUiState";
import mockInitialUserState from "../../mocks/states/mockInitialUserState";
import {
  loginUser,
  logoutUser,
} from "../../store/user-feature/user-feature.actions";
import { createMock } from "@testing-library/angular/jest-utils";
import { throwError } from "rxjs";

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

describe("Given the service User Service", () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers,
    });
    service = TestBed.inject(UserService);
  });

  describe("When it's method getToken is invoked with username 'admin' and password 'admin123'", () => {
    test("Then it should return an observable with a token", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const userData: UserCredentials = {
        username: "admin",
        password: "admin123",
      };

      const token = "testtoken";

      const token$ = service.getToken(userData);

      token$.subscribe((data) => {
        expect(data.token).toBe("testtoken");
      });

      const mockRequest = httpMock.expectOne(`${apiUrl}/users/login`);

      mockRequest.flush({ token });

      expect(mockRequest.request.method).toBe("POST");

      httpMock.verify();
    });
  });

  describe("When its method getToken is invoked and the server returns 404", () => {
    test("Then handleError should be called", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const userData: UserCredentials = {
        username: "admin",
        password: "admin123",
      };

      const handleError = jest.spyOn(service, "handleError");

      const response$ = service.getToken(userData);
      response$.subscribe();

      const mockRequest = httpMock.expectOne(`${apiUrl}/users/login`);

      mockRequest.flush("", { status: 404, statusText: "" });

      expect(mockRequest.request.method).toBe("POST");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When its method registerUser is invoked with username 'nimda', password 'nimda123' and confirmPassword 'nimda123'", () => {
    test("Then it should return the message 'You have registered successfully'", () => {
      const httpMock = TestBed.inject(HttpTestingController);
      const registerFormData: RegisterUserCredentials = {
        username: "nimda",
        password: "nimda123",
        confirmPassword: "nimda123",
        owner: false,
      };
      const reponseBody = { message: "You have registered successfully" };

      const response$ = service.registerUser(registerFormData);

      response$.subscribe((data) => {
        expect(data).toBe(reponseBody);
      });

      const mockRequest = httpMock.expectOne(`${apiUrl}/users/register`);

      mockRequest.flush(reponseBody);

      expect(mockRequest.request.method).toBe("POST");

      httpMock.verify();
    });
  });

  describe("When its method register user is invoked and the server returns status 500", () => {
    test("Then handleError should be invoked", () => {
      const httpMock = TestBed.inject(HttpTestingController);

      const userData: RegisterUserCredentials = {
        username: "admin",
        password: "admin123",
        confirmPassword: "admin123",
        owner: false,
      };

      const handleError = jest.spyOn(service, "handleError");

      const response$ = service.registerUser(userData);
      response$.subscribe();

      const mockRequest = httpMock.expectOne(`${apiUrl}/users/register`);

      mockRequest.flush("", { status: 500, statusText: "" });

      expect(mockRequest.request.method).toBe("POST");

      httpMock.verify();

      expect(handleError).toHaveBeenCalled();
    });
  });

  describe("When its method loginUser is invoked with username 'admin', id 'testid' and token 'testtoken'", () => {
    test("Then the store's dispatch should be invoked with a loginUser action and the user's details", () => {
      const loginUserData: User = {
        id: "testid",
        token: "testtoken",
        username: "admin",
        owner: false,
      };
      const store = getMockStore<ApplicationState>({
        initialState: {
          ui: mockInitialUiState,
          user: mockInitialUserState,
          locations: { locations: [] },
        },
      });

      const userService = new UserService(
        {} as HttpClient,
        store,
        {} as UiService
      );

      const dispatchSpy = jest.spyOn(store, "dispatch");

      userService.loginUser(loginUserData);

      expect(dispatchSpy).toHaveBeenCalledWith(
        loginUser({ payload: loginUserData })
      );
    });
  });

  describe("When the method handleError is invoked with a HttpErrorResponse with 'Incorrect username or password' and the UiService", () => {
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

  describe("When the method logoutUser is invoked", () => {
    test("Then the store's method dispatch should be called with a logoutUser action", () => {
      const store = getMockStore<ApplicationState>({
        initialState: {
          ui: mockInitialUiState,
          user: mockInitialUserState,
          locations: { locations: [] },
        },
      });

      const userService = new UserService(
        {} as HttpClient,
        store,
        {} as UiService
      );

      const dispatchSpy = jest.spyOn(store, "dispatch");

      userService.logoutUser();

      expect(dispatchSpy).toHaveBeenCalledWith(logoutUser());
    });
  });
});
