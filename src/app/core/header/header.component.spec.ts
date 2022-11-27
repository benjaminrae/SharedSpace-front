import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import mockInitialUiState from "../../mocks/states/mockInitialUiState";
import mockInitialUserState from "../../mocks/states/mockInitialUserState";
import { ApplicationState } from "../../store/types";
import { UserState } from "../../store/user-feature/types";
import { HeaderComponent } from "./header.component";

describe("Given a Header component", () => {
  const homeLabel = /home/i;
  const expectedHeading = /sharedspace/i;

  describe("When it is rendered and there isn't a user logged in", () => {
    test("Then it should show a heading level 1 'SharedSpace', and links 'Home', 'Login' and 'Register'", async () => {
      const loginLabel = /^login$/i;
      const registerLabel = /^register$/i;

      await render(HeaderComponent, {
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
      const renderedHeading = screen.queryByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(homeLink).toBeInTheDocument();
      expect(loginLink).toBeInTheDocument();
      expect(registerLink).toBeInTheDocument();
      expect(renderedHeading).toBeInTheDocument();
    });
  });

  describe("When it is rendered and a user is logged in", () => {
    test("Then it should show a heading level 1 'SharedSpace', and links 'Home' and 'Logout'", async () => {
      const logoutLabel = /logout/i;

      const loggedUserState: UserState = {
        ...mockInitialUserState,
        isLogged: true,
      };

      await render(HeaderComponent, {
        providers: [
          HttpClient,
          HttpHandler,
          provideMockStore<ApplicationState>({
            initialState: {
              ui: mockInitialUiState,
              user: loggedUserState,
            },
          }),
        ],
      });

      const homeLink = screen.queryByRole("link", { name: homeLabel });
      const renderedHeading = screen.queryByRole("heading", {
        level: 1,
        name: expectedHeading,
      });
      const logoutLink = screen.queryByRole("link", { name: logoutLabel });

      expect(homeLink).toBeInTheDocument();
      expect(renderedHeading).toBeInTheDocument();
      expect(logoutLink).toBeInTheDocument();
    });
  });
});
