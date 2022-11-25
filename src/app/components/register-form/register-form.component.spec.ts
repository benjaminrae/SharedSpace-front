import { HttpClient, HttpHandler } from "@angular/common/http";

import { FormBuilder } from "@angular/forms";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { ButtonComponent } from "../../core/button/button.component";

import { RegisterFormComponent } from "./register-form.component";

const providers = [FormBuilder, HttpClient, HttpHandler, provideMockStore({})];
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

  describe("When it is rendered", () => {
    test("Then it should show a heading level 2 with 'Sign up for SharedSpace', three inputs 'Username', 'Password', 'Confirm password', a checkbox 'I want to offer a space' and a button 'Sign up'", async () => {
      await render(RegisterFormComponent, {
        providers,
        declarations,
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
});
