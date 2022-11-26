import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { FormBuilder } from "@angular/forms";
import { LoginFormComponent } from "./login-form.component";
import { ButtonComponent } from "../../core/button/button.component";
import { UiService } from "../../services/ui/ui.service";
import { TokenService } from "../../services/token/token.service";
import { UserService } from "../../services/user/user.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import { createMock } from "@testing-library/angular/jest-utils";
import mockToken from "../../mocks/states/mockToken";

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
  const userInput = {
    username: "isdicoders",
    password: "isdicoders",
  };

  const userService = createMock(UserService);
  const uiService = createMock(UiService);

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

  describe("When it is rendered and the user types username 'isdicoders' and password 'isdicoders'", () => {
    test("Then those values should show on the screen", async () => {
      await render(LoginFormComponent, {
        providers,
        declarations,
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);

      await userEvent.type(usernameInput!, userInput.username);
      await userEvent.type(passwordInput!, userInput.password);

      expect(usernameInput).toHaveValue(userInput.username);
      expect(passwordInput).toHaveValue(userInput.password);
    });
  });

  describe("And when the form is submitted", () => {
    test("Then showLoading, getToken, hideLoading and showSuccessModal with messge 'You have logged in correctly' should be called", async () => {
      const tokenData = {
        token: mockToken,
      };
      const data = {
        subscribe: jest
          .fn()
          .mockImplementation(
            (callback: (tokenData: { token: string }) => void) => {
              callback(tokenData);
            }
          ),
      };

      userService.getToken.mockReturnValue(data);

      await render(LoginFormComponent, {
        providers: [
          FormBuilder,
          TokenService,
          HttpClient,
          HttpHandler,
          provideMockStore({}),
        ],
        declarations,
        componentProviders: [
          {
            provide: UserService,
            useValue: userService,
          },
          {
            provide: UiService,
            useValue: uiService,
          },
        ],
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);

      await userEvent.type(usernameInput!, userInput.username);
      await userEvent.type(passwordInput!, userInput.password);

      const form = screen.queryByTestId("form");
      form?.dispatchEvent(new Event("ngSubmit"));

      expect(form).toBeInTheDocument();
      expect(uiService.showLoading).toHaveBeenCalled();
      expect(userService.getToken).toHaveBeenCalled();
      expect(uiService.hideLoading).toHaveBeenCalled();
      expect(uiService.showSuccessModal).toHaveBeenCalledWith(
        "You have logged in correctly"
      );
    });
  });
});
