import { render, screen } from "@testing-library/angular";
import { ButtonComponent } from "./button.component";

describe("Given a Button component", () => {
  describe("When it is rendered with text 'Hello'", () => {
    test("Then it should show a button with text 'Hello' on the screen", async () => {
      const buttonText = "Hello";
      const buttonRole = "button";

      await render(ButtonComponent, {
        componentProperties: { inverted: false, text: buttonText },
      });

      const renderedButton = screen.queryByRole(buttonRole, {
        name: buttonText,
      });

      expect(renderedButton).toBeInTheDocument();
    });
  });
});
