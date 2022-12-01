import { screen, render } from "@testing-library/angular";

import { LocationFormPageComponent } from "./location-form-page.component";

describe("Given a LocationFormPageComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading level 2 with 'Add your location'", async () => {
      const expectedHeading = {
        level: 2,
        name: "Add your location",
      };

      await render(LocationFormPageComponent);

      const renderedHeading = screen.queryByRole("heading", expectedHeading);

      expect(renderedHeading).toBeInTheDocument();
    });
  });
});
