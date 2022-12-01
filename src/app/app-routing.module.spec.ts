import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event/";
import { routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { CoreModule } from "./core/core.module";
import { CredentialsPageComponent } from "./pages/credentials-page/credentials-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

describe("Given the app component", () => {
  describe("When it is rendered and the user clicks Login", () => {
    test("Then it should show the home page", async () => {
      const loginLabel = /^login$/i;
      const loginHeadingText = "Log in to SharedSpace";

      await render(AppComponent, {
        routes,
        imports: [CoreModule, HttpClientTestingModule, RouterOutlet],
        providers: [provideMockStore({}), FormBuilder],
        declarations: [
          LayoutComponent,
          HomePageComponent,
          CredentialsPageComponent,
          LoginFormComponent,
        ],
      });

      const loginLink = screen.queryByRole("link", {
        name: loginLabel,
      });

      await userEvent.click(loginLink!);

      const loginHeading = screen.queryByRole("heading", {
        name: loginHeadingText,
      });
      screen.debug();

      expect(loginHeading).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user clicks Register", () => {
    test("Then it should show the home page", async () => {
      const registerLabel = /^register$/i;
      const registerHeadingText = "Sign up for SharedSpace";

      await render(AppComponent, {
        routes,
        imports: [CoreModule, HttpClientTestingModule, RouterOutlet],
        providers: [provideMockStore({}), FormBuilder],
        declarations: [
          LayoutComponent,
          HomePageComponent,
          CredentialsPageComponent,
          RegisterFormComponent,
        ],
      });

      const registerLink = screen.queryByRole("link", {
        name: registerLabel,
      });

      await userEvent.click(registerLink!);

      const registerHeading = screen.queryByRole("heading", {
        name: registerHeadingText,
      });
      screen.debug();

      expect(registerHeading).toBeInTheDocument();
    });
  });
});
