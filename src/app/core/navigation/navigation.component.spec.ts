import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { createMock } from "@testing-library/angular/jest-utils";
import userEvent from "@testing-library/user-event";
import { of } from "rxjs";
import { routes } from "../../app-routing.module";
import mockInitialUiState from "../../mocks/states/mockInitialUiState";
import mockInitialUserState from "../../mocks/states/mockInitialUserState";
import { TokenService } from "../../services/token/token.service";
import { UserService } from "../../services/user/user.service";
import { ApplicationState } from "../../store/types";
import { UserState } from "../../store/user-feature/types";

import { NavigationComponent } from "./navigation.component";

describe("Given a Navigation component", () => {
  const homeLabel = /home/i;

  describe("When it is rendered and there isn't a user logged in", () => {
    test("Then it should show links 'Home', 'Login' and 'Register'", async () => {
      const loginLabel = /^login$/i;
      const registerLabel = /^register$/i;

      await render(NavigationComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
      });

      const homeLink = screen.queryByRole("link", {
        name: homeLabel,
      });
      const loginLink = screen.queryByRole("link", {
        name: loginLabel,
      });
      const registerLink = screen.queryByRole("link", {
        name: registerLabel,
      });

      expect(homeLink).toBeInTheDocument();
      expect(loginLink).toBeInTheDocument();
      expect(registerLink).toBeInTheDocument();
    });
  });

  describe("When it is rendered and a user is logged in", () => {
    const logoutLabel = /logout/i;
    const loggedUserState: UserState = {
      ...mockInitialUserState,
      isLogged: true,
    };

    test("Then it should show links 'Home' and 'Logout'", async () => {
      await render(NavigationComponent, {
        providers: [
          HttpClient,
          HttpHandler,
          provideMockStore<ApplicationState>({
            initialState: {
              ui: mockInitialUiState,
              user: loggedUserState,
              locations: { count: 0, next: "", previous: "", locations: [] },
            },
          }),
        ],
      });

      const homeLink = screen.queryByRole("link", { name: homeLabel });
      const logoutButton = screen.queryByRole("button", { name: logoutLabel });

      expect(homeLink).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });

    test("And then userService's logoutUser and tokenService's removeToken should be called when Logout is clicked and the user should navigate", async () => {
      const userService = createMock(UserService);
      const tokenService = createMock(TokenService);

      userService.getIsLogged.mockReturnValue(of({ isLogged: true }));

      await render(NavigationComponent, {
        providers: [
          HttpClient,
          HttpHandler,
          provideMockStore<ApplicationState>({
            initialState: {
              ui: mockInitialUiState,
              user: loggedUserState,
              locations: { count: 0, next: "", previous: "", locations: [] },
            },
          }),
        ],
        componentProviders: [
          {
            provide: UserService,
            useValue: userService,
          },
          { provide: TokenService, useValue: tokenService },
        ],
        imports: [RouterTestingModule.withRoutes(routes)],
      });

      const logoutButton = screen.queryByRole("button", {
        name: logoutLabel,
      });

      const router = TestBed.inject(Router);

      await userEvent.click(logoutButton!);

      expect(logoutButton).toBeInTheDocument();
      expect(router.navigated).toBe(true);
      expect(userService.logoutUser).toHaveBeenCalled();
      expect(tokenService.removeToken).toHaveBeenCalled();
    });
  });

  describe("When it is rendered on a smaller screen", () => {
    test("Then it should show a button with label 'Toggle menu' and it's class should include --open when clicked", async () => {
      const buttonLabel = "Toggle menu";
      const openModifier = "--open";

      await render(NavigationComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
      });

      const hamburgerButton = screen.queryByRole("button", {
        name: buttonLabel,
      });

      await userEvent.click(hamburgerButton!);

      expect(hamburgerButton?.className).toContain(openModifier);
    });
  });
});
