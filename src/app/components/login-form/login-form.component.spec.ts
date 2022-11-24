import { fireEvent, render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { FormBuilder } from "@angular/forms";
import { LoginFormComponent } from "./login-form.component";
import { ButtonComponent } from "../../core/button/button.component";
import { UiService } from "../../services/ui/ui.service";
import { TokenService } from "../../services/token/token.service";
import { UserService } from "../../services/user/user.service";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";

const providers = [
  FormBuilder,
  TokenService,
  UiService,
  UserService,
  HttpClient,
  HttpHandler,
  provideMockStore({}),
];
const declarations = [ButtonComponent];

describe("Given a LoginFormComponent", () => {
  const usernameLabel = /username/i;
  const passwordLabel = /password/i;
  const loginButtonText = /login/i;

  describe("When it is rendered", () => {
    test("Then it should show a heading level 2 with 'Log in to SharedSpace', two inputs 'Username' and 'Password' and a button 'Login'", async () => {
      const expectedHeading = {
        level: 2,
        name: "Log in to SharedSpace",
      };

      await render(LoginFormComponent, {
        providers,
        declarations,
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);
      const renderedHeading = screen.queryByRole("heading", expectedHeading);
      const loginButton = screen.queryByRole("button", {
        name: loginButtonText,
      });

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(renderedHeading).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user types username 'user' and password '12345'", () => {
    test("Then the login button should be disabled", async () => {
      const userInput = {
        username: "user",
        password: "12345",
      };

      await render(LoginFormComponent, {
        providers,
        declarations,
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);
      const loginButton = screen.queryByRole("button", {
        name: loginButtonText,
      });

      await userEvent.type(usernameInput!, userInput.username);
      await userEvent.type(passwordInput!, userInput.password);

      expect(loginButton).toBeDisabled();
    });
  });
});
