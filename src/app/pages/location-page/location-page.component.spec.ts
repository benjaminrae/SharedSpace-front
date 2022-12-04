import { HttpClient, HttpHandler } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { createMock } from "@testing-library/angular/jest-utils";
import { of } from "rxjs";
import userEvent from "@testing-library/user-event";
import { getRandomLocation } from "../../factories/locationsFactory";
import { LocationsService } from "../../services/locations/locations.service";
import { UiService } from "../../services/ui/ui.service";
import { UserService } from "../../services/user/user.service";
import { LocationPageComponent } from "./location-page.component";
import { ButtonComponent } from "../../core/button/button.component";

describe("Given a location page component", () => {
  const locationService = createMock(LocationsService);
  const userService = createMock(UserService);
  const uiService = createMock(UiService);
  const location = getRandomLocation();
  const fakeActivatedRoute: Partial<ActivatedRoute> = {
    params: of({ locationId: location.id }),
  };

  describe("When it is rendered with a location", () => {
    test("Then getLocationById, showLoading and getUserId should be called and the location's name in a heading level 2", async () => {
      const expectedHeading = { level: 2, name: location.name };

      locationService.getLocationById = jest
        .fn()
        .mockReturnValue(of({ location }));

      await render(LocationPageComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        componentProviders: [
          { provide: LocationsService, useValue: locationService },
          { provide: UserService, useValue: userService },
          { provide: UiService, useValue: uiService },
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        ],
      });

      const renderedHeading = screen.queryByRole("heading", expectedHeading);

      expect(locationService.getLocationById).toHaveBeenCalled();
      expect(userService.getUserId).toHaveBeenCalled();
      expect(uiService.showLoading).toHaveBeenCalled();
      expect(renderedHeading).toBeInTheDocument();
    });
  });

  describe("When it is rendered with a location and the delete button is clicked", () => {
    test("Then deleteLocation should be called with the location's id and navigate with '/'", async () => {
      const deleteLabel = /delete/i;
      locationService.getLocationById = jest
        .fn()
        .mockReturnValue(of({ location }));

      userService.getUserId = jest.fn().mockReturnValue(of(location.owner));

      await render(LocationPageComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        componentProviders: [
          { provide: LocationsService, useValue: locationService },
          { provide: UserService, useValue: userService },
          { provide: UiService, useValue: uiService },
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        ],
        declarations: [ButtonComponent],
      });

      const deleteButton = screen.queryByRole("button", {
        name: deleteLabel,
      });

      await userEvent.click(deleteButton!);

      expect(locationService.deleteLocation).toHaveBeenCalledWith(location.id);
      expect(uiService.navigate).toHaveBeenCalledWith("/");
    });
  });
});
