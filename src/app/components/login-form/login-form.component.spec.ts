import { render, screen } from "@testing-library/angular";
import { FormBuilder } from "@angular/forms";
import { LoginFormComponent } from "./login-form.component";
import { ButtonComponent } from "../../core/button/button.component";

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
        providers: [FormBuilder],
        declarations: [ButtonComponent],
      });

      const usernameInput = screen.queryByRole("textbox", {
        name: usernameLabel,
      });
      const passwordInput = screen.queryByLabelText(passwordLabel);
      const renderedHeading = screen.queryByRole("heading", expectedHeading);
      const loginButton = screen.queryByRole("button", {
        name: loginButtonText,
      });

      screen.debug();

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(renderedHeading).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
    });
  });
});
