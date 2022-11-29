import { render, screen } from "@testing-library/angular";
import { ButtonComponent } from "../../core/button/button.component";
import { getRandomLocation } from "../../factories/locationsFactory";
import { LocationCardComponent } from "./location-card.component";

describe("Given a LocationCardComponent", () => {
  describe("When it receives a location", () => {
    test("Then it should render an image with the locations name as alt text, a heading level 3 with the name, the locations location and an info button", async () => {
      const location = getRandomLocation();
      const expectedButton = /info/i;

      await render(LocationCardComponent, {
        componentProperties: {
          location,
        },
        declarations: [ButtonComponent],
      });

      const renderedHeading = screen.queryByRole("heading", {
        level: 3,
        name: location.name,
      });
      const infoButton = screen.queryByRole("button", {
        name: expectedButton,
      });
      const locationText = screen.queryByText(location.location);
      const image = screen.queryByRole("img", {
        name: location.name,
      });

      expect(renderedHeading).toBeInTheDocument();
      expect(infoButton).toBeInTheDocument();
      expect(locationText).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });
  });
});
