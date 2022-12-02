import { createMock } from "@testing-library/angular/jest-utils";
import userEvent from "@testing-library/user-event";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { ButtonComponent } from "../../core/button/button.component";
import { getRandomLocation } from "../../factories/locationsFactory";
import { LocationCardComponent } from "./location-card.component";
import { LocationsService } from "../../services/locations/locations.service";

describe("Given a LocationCardComponent", () => {
  const location = getRandomLocation();
  const deleteLabel = /delete/i;

  describe("When it receives a location", () => {
    test("Then it should render an image with the locations name as alt text, a heading level 3 with the name, the locations location and an info button", async () => {
      const expectedButton = /info/i;

      await render(LocationCardComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
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

  describe("When it receives a location and owner true", () => {
    test("Then it should render the buttons Modify and Delete", async () => {
      const modifyLabel = /modify/i;

      await render(LocationCardComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        componentProperties: {
          location,
          owner: true,
        },
        declarations: [ButtonComponent],
      });

      const deleteButton = screen.queryByRole("button", {
        name: deleteLabel,
      });

      const modifyButton = screen.queryByRole("button", {
        name: modifyLabel,
      });

      expect(deleteButton).toBeInTheDocument();
      expect(modifyButton).toBeInTheDocument();
    });

    test("And then it should invoke deleteLocation when the delete button is clicked", async () => {
      const locationsService = createMock(LocationsService);

      await render(LocationCardComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        componentProperties: {
          location,
          owner: true,
        },
        componentProviders: [
          {
            provide: LocationsService,
            useValue: locationsService,
          },
        ],
        declarations: [ButtonComponent],
      });

      const deleteButton = screen.queryByRole("button", {
        name: deleteLabel,
      });

      await userEvent.click(deleteButton!);

      expect(locationsService.deleteLocation).toHaveBeenCalledWith(location.id);
    });
  });
});
