import { render, screen } from "@testing-library/angular";

import { AppComponent } from "./app.component";

describe("Given an AppComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading level 1 with 'SharedSpace' on the screen", async () => {
      const expectedHeading = {
        level: 1,
        name: "SharedSpace",
      };

      await render(AppComponent);

      const renderedHeading = screen.getByRole("heading", expectedHeading);

      expect(renderedHeading).toBeInTheDocument();
    });
  });
});
