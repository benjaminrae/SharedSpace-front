import { render, screen } from "@testing-library/angular";
import { Locations } from "../../store/locations-feature/types";
import { getRandomLocations } from "../../factories/locationsFactory";
import { LocationListComponent } from "./location-list.component";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import userEvent from "@testing-library/user-event/";
import { LocationsService } from "src/app/services/locations/locations.service";
import { createMock } from "@testing-library/angular/jest-utils";

describe("Given a LocationListComponent", () => {
  describe("When it is rendered and there are 6 locations in the store", () => {
    test("Then it should show 6 locations on the screen, the text '6 locations found'", async () => {
      const totalLocations = 6;
      const locations = getRandomLocations(totalLocations);
      const expectedCount = `${totalLocations} locations found`;

      await render(LocationListComponent, {
        providers: [
          HttpClient,
          HttpHandler,
          provideMockStore({
            initialState: { locations: { count: totalLocations, locations } },
          }),
        ],
      });

      screen.debug();

      const renderedCount = screen.queryByText(expectedCount);
      const renderedList = screen.queryAllByRole("listitem");

      expect(renderedList).toHaveLength(totalLocations);
      expect(renderedCount).toBeInTheDocument();
    });
  });

  describe("When it is rendered and there are 0 locations in the store", () => {
    test("Then it should show an image with alt 'No results found', the text '0 locations found' and the text 'Try another search'", async () => {
      const totalLocations = 0;
      const locations = [] as Locations;
      const expectedCount = `${totalLocations} locations found`;
      const imageAlt = "No results found";
      const informationText = "Try another search";

      await render(LocationListComponent, {
        providers: [
          HttpClient,
          HttpHandler,
          provideMockStore({
            initialState: { locations: { count: totalLocations, locations } },
          }),
        ],
      });

      const renderedCount = screen.queryByText(expectedCount);
      const renderedInformation = screen.queryByText(informationText);
      const renderedImage = screen.queryByAltText(imageAlt);

      expect(renderedCount).toBeInTheDocument();
      expect(renderedInformation).toBeInTheDocument();
      expect(renderedImage).toBeInTheDocument();
    });
  });

  describe("When it is rendered and there is a next link in the store", () => {
    test("Then locationService's getNextLocations should be invoked when Show more is clicked", async () => {
      const next = "nextlocations.com";
      const showMoreLabel = /show more/i;

      const locationsService = createMock(LocationsService);

      await render(LocationListComponent, {
        providers: [
          HttpClient,
          HttpHandler,
          provideMockStore({
            initialState: {
              locations: { next, locations: getRandomLocations(10) },
            },
          }),
        ],
        componentProviders: [
          { provide: LocationsService, useValue: locationsService },
        ],
      });

      const showMoreButton = screen.queryByRole("button", {
        name: showMoreLabel,
      });

      await userEvent.click(showMoreButton!);

      expect(locationsService.getNextLocations).toHaveBeenCalledWith(next);
    });
  });
});
