import { EventEmitter } from "@angular/core";
import { render, screen, fireEvent } from "@testing-library/angular";
import { ButtonComponent } from "./button.component";

describe("Given a Button component", () => {
  const buttonText = "Hello";
  const buttonRole = "button";

  describe("When it is rendered with text 'Hello'", () => {
    test("Then it should show a button with text 'Hello' on the screen", async () => {
      await render(ButtonComponent, {
        componentProperties: { inverted: false, text: buttonText },
      });

      const renderedButton = screen.queryByRole(buttonRole, {
        name: buttonText,
      });

      expect(renderedButton).toBeInTheDocument();
    });
  });

  describe("When it is rendered with an onClick action", () => {
    test("Then the action should be invoked when the user clicks the button", async () => {
      const onClick = { emit: jest.fn() };

      await render(ButtonComponent, {
        componentProperties: {
          inverted: false,
          text: buttonText,
          onClick: onClick as unknown as EventEmitter<any>,
        },
      });

      const renderedButton = screen.queryByRole(buttonRole, {
        name: buttonText,
      });

      fireEvent.click(renderedButton!);

      expect(onClick.emit).toHaveBeenCalled();
    });
  });
});
