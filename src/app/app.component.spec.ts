import { render, screen } from "@testing-library/angular";
import { AppComponent } from "./app.component";
import { UiService } from "./services/ui/ui.service";
import { provideMockStore } from "@ngrx/store/testing";
import { TokenService } from "./services/token/token.service";
import { UserService } from "./services/user/user.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { HeaderComponent } from "./core/header/header.component";
import { routes } from "./app-routing.module";
import mockToken from "./mocks/states/mockToken";
import { ApplicationState } from "./store/types";
import mockInitialUiState from "./mocks/states/mockInitialUiState";
import mockInitialUserState from "./mocks/states/mockInitialUserState";
import { CredentialsPageComponent } from "./pages/credentials-page/credentials-page.component";
import { ButtonComponent } from "./core/button/button.component";
import mockLocalStorage from "./mocks/states/localStorage/mockLocalStorage";
import { createMock } from "@testing-library/angular/jest-utils";
import { LayoutComponent } from "./components/layout/layout.component";

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });
});

const providers = [
  UiService,
  TokenService,
  UserService,
  HttpClient,
  HttpHandler,
  provideMockStore<ApplicationState>({
    initialState: { ui: mockInitialUiState, user: mockInitialUserState },
  }),
];

describe("Given an AppComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading level 1 with 'SharedSpace' on the screen", async () => {
      const expectedHeading = {
        level: 1,
        name: "SharedSpace",
      };

      await render(AppComponent, {
        providers,
        declarations: [HeaderComponent, LayoutComponent],
      });

      const renderedHeading = screen.getByRole("heading", expectedHeading);

      expect(renderedHeading).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user navigates to '/register'", () => {
    test("Then the user should see the register form on the screen", async () => {
      await render(AppComponent, {
        providers,
        declarations: [HeaderComponent, LayoutComponent],
        routes,
      });

      screen.debug();
    });
  });

  describe("When it is rendered and there is a token in local storage", () => {
    mockLocalStorage.setItem("token", mockToken);
    const userService = createMock(UserService);
    const tokenService = new TokenService();

    const user = tokenService.decodeToken(mockToken);

    test("Then the user should be logged in", async () => {
      await render(AppComponent, {
        providers,
        declarations: [
          HeaderComponent,
          CredentialsPageComponent,
          ButtonComponent,
        ],
        componentProviders: [
          {
            provide: UserService,
            useValue: userService,
          },
        ],
        routes,
      });

      expect(userService.loginUser).toHaveBeenCalledWith({
        ...user,
        token: mockToken,
      });
    });
  });
});
