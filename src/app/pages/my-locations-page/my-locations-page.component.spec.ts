import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { LocationCardComponent } from "../../components/location-card/location-card.component";
import { LocationListComponent } from "../../components/location-list/location-list.component";
import { MyLocationsPageComponent } from "./my-locations-page.component";

describe("Given a MyLocationsPage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading level 2 'Your locations", async () => {
      const expectedHeading = {
        level: 2,
        name: "Your locations",
      };

      await render(MyLocationsPageComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        declarations: [LocationListComponent, LocationCardComponent],
      });

      const renderedHeading = screen.queryByRole("heading", expectedHeading);

      expect(renderedHeading).toBeInTheDocument();
    });
  });
});
