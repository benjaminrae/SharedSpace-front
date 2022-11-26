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
import { HttpClient } from "@angular/common/http";
import { UiService } from "../ui/ui.service";
import { ApplicationState } from "../../store/types";
import mockInitialUiState from "../../mocks/states/mockInitialUiState";
import mockInitialUserState from "../../mocks/states/mockInitialUserState";
import { loginUser } from "../../store/user-feature/user-feature.actions";

const { apiUrl } = environment;

const providers = [provideMockStore({})];

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

  describe("When its method loginUser is invoked with username 'admin', id 'testid' and token 'testtoken'", () => {
    test("Then the store's dispatch should be invoked with a loginUser action and the user's details", () => {
      const loginUserData: User = {
        id: "testid",
        token: "testtoken",
        username: "admin",
      };
      const store = getMockStore<ApplicationState>({
        initialState: { ui: mockInitialUiState, user: mockInitialUserState },
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
});
