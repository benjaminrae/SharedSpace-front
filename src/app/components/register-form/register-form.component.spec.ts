import { HttpClient, HttpHandler } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event/";
import { ButtonComponent } from "../../core/button/button.component";
import { RegisterFormComponent } from "./register-form.component";
import { UiService } from "../../services/ui/ui.service";
import { UserService } from "../../services/user/user.service";
import { createMock } from "@testing-library/angular/jest-utils";

const providers = [
  UserService,
  UiService,
  FormBuilder,
  HttpClient,
  HttpHandler,
  provideMockStore({}),
];
const declarations = [ButtonComponent];

describe("Given a RegisterFormComponent", () => {
  const usernameLabel = /username/i;
  const passwordLabel = /^password$/i;
  const confirmPasswordLabel = /confirm password/i;
  const signupButtonText = /sign up/i;
  const checkboxLabel = /i want to offer a space/i;
  const expectedHeading = {
    level: 2,
    name: "Sign up for SharedSpace",
  };
  const userInput = {
    username: "benjamin",
    password: "benjamin",
    confirmPassword: "benjamin",
  };
  const userService = createMock(UserService);
  const uiService = createMock(UiService);

  describe("When it is rendered", () => {
    test("Then it should show a heading level 2 with 'Sign up for SharedSpace', three inputs 'Username', 'Password', 'Confirm password', a checkbox 'I want to offer a space' and a button 'Sign up'", async () => {
      await render(RegisterFormComponent, {
        providers,
        declarations,
        detectChanges: true,
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);
      const confirmPasswordInput =
        screen.queryByLabelText(confirmPasswordLabel);
      const renderedHeading = screen.queryByRole("heading", expectedHeading);
      const checkbox = screen.queryByRole("checkbox", { name: checkboxLabel });
      const signupButton = screen.queryByRole("button", {
        name: signupButtonText,
      });

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(renderedHeading).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      expect(signupButton).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user types username 'john', password '12345' and confirm password '12345'", () => {
    test("Then the login button should be disabled", async () => {
      const userInput = {
        username: "john",
        password: "12345",
        confirmPassword: "12345",
      };

      await render(RegisterFormComponent, {
        providers,
        declarations,
        detectChanges: true,
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);
      const confirmPasswordInput =
        screen.queryByLabelText(confirmPasswordLabel);
      const signupButton = screen.queryByRole("button", {
        name: signupButtonText,
      });

      await userEvent.type(usernameInput!, userInput.username);
      await userEvent.type(passwordInput!, userInput.password);
      await userEvent.type(confirmPasswordInput!, userInput.confirmPassword);

      expect(signupButton).toBeDisabled();
    });
  });

  describe("When it is rendered and the user types username 'benjamin', password 'benjamin' and confirmPassword 'benjamin'", () => {
    test("Then those values should show on the screen", async () => {
      await render(RegisterFormComponent, {
        declarations,
        providers: [FormBuilder, HttpClient, HttpHandler, provideMockStore({})],
        componentProviders: [
          {
            provide: UserService,
            useValue: userService,
          },
          { provide: UiService, useValue: uiService },
        ],
        detectChanges: true,
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);
      const confirmPasswordInput =
        screen.queryByLabelText(confirmPasswordLabel);
      const signupButton = screen.queryByRole("button", {
        name: signupButtonText,
      });

      await userEvent.type(usernameInput!, userInput.username);
      await userEvent.type(passwordInput!, userInput.password);
      await userEvent.type(confirmPasswordInput!, userInput.confirmPassword);

      expect(usernameInput).toHaveValue(userInput.username);
      expect(usernameInput).toHaveValue(userInput.username);
      expect(usernameInput).toHaveValue(userInput.username);
    });
  });

  describe("And when the form is submitted", () => {
    test("Then showLoading, registerUser, hideLoading and showSuccess modal with message 'You have successfully registered' should be called", async () => {
      const data = {
        subscribe: jest.fn().mockImplementation((callback: () => void) => {
          callback();
        }),
      };

      userService.registerUser.mockReturnValue(data);

      await render(RegisterFormComponent, {
        declarations,
        providers: [FormBuilder, HttpClient, HttpHandler, provideMockStore({})],
        componentProviders: [
          {
            provide: UserService,
            useValue: userService,
          },
          { provide: UiService, useValue: uiService },
        ],
        detectChanges: true,
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);
      const confirmPasswordInput =
        screen.queryByLabelText(confirmPasswordLabel);

      await userEvent.type(usernameInput!, userInput.username);
      await userEvent.type(passwordInput!, userInput.password);
      await userEvent.type(confirmPasswordInput!, userInput.confirmPassword);

      const form = screen.queryByTestId("form");
      form?.dispatchEvent(new Event("ngSubmit"));

      expect(form).toBeInTheDocument();
      expect(uiService.showLoading).toHaveBeenCalled();
      expect(userService.registerUser).toHaveBeenCalled();
      expect(uiService.hideLoading).toHaveBeenCalled();
      expect(uiService.showSuccessModal).toHaveBeenCalledWith(
        "You have successfully registered"
      );
    });
  });
});
