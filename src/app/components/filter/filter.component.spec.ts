import { HttpClient, HttpHandler } from "@angular/common/http";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { createMock } from "@testing-library/angular/jest-utils";
import userEvent from "@testing-library/user-event";
import { LocationsService } from "../../services/locations/locations.service";

import { FilterComponent } from "./filter.component";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a filter component", () => {
  const filterLabel = /filter/i;

  describe("When it is rendered", () => {
    test("Then it should show a button with text filter", async () => {
      await render(FilterComponent, {
        providers: [FormBuilder, HttpClient, HttpHandler, provideMockStore({})],
      });

      const filterButton = screen.queryByRole("button", { name: filterLabel });

      expect(filterButton).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the filter button is clicked", () => {
    test("Then it should show 16 checkboxes", async () => {
      const totalCheckboxes = 16;

      await render(FilterComponent, {
        providers: [FormBuilder, HttpClient, HttpHandler, provideMockStore({})],
      });

      const filterButton = screen.queryByRole("button", { name: filterLabel });

      await userEvent.click(filterButton!);

      const checkboxes = screen.queryAllByRole("checkbox");

      expect(checkboxes).toHaveLength(totalCheckboxes);
    });

    test("And then getFilteredLocations should be invoked when a checkbox is clicked", async () => {
      const locationsService = createMock(LocationsService);

      await render(FilterComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        componentProviders: [
          { provide: LocationsService, useValue: locationsService },
          { provide: FormBuilder },
        ],
        imports: [ReactiveFormsModule],
      });

      const filterButton = screen.queryByRole("button", { name: filterLabel });

      await userEvent.click(filterButton!);

      const checkboxes = screen.queryAllByRole("checkbox");

      await userEvent.click(checkboxes[0]);

      expect(locationsService.getFilteredLocations).toHaveBeenCalled();
    });

    test("And then when the clear button is clicked all forms values should be reset", async () => {
      const locationsService = createMock(LocationsService);
      const clearLabel = /clear/i;

      await render(FilterComponent, {
        providers: [FormBuilder, HttpClient, HttpHandler, provideMockStore({})],
        componentProviders: [
          { provide: LocationsService, useValue: locationsService },
        ],
      });

      const filterButton = screen.queryByRole("button", { name: filterLabel });

      await userEvent.click(filterButton!);

      const clearButton = screen.queryByRole("button", { name: clearLabel });

      expect(clearButton).toBeInTheDocument();

      const checkboxes = screen.queryAllByRole("checkbox");

      await userEvent.click(checkboxes[0]);
      await userEvent.click(checkboxes[1]);

      await userEvent.click(clearButton!);

      expect(locationsService.getFilteredLocations).toHaveBeenCalled();
    });
  });
});
