import { HttpClient, HttpHandler } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { screen, render } from "@testing-library/angular";
import { of } from "rxjs";

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

  describe("When it is rendered with edit-location in the url", () => {
    test("Then it should show a heading level 2 with 'Edit your location'", async () => {
      const expectedHeading = {
        level: 2,
        name: "Edit your location",
      };
      const fakeActivatedRoute: Partial<ActivatedRoute> = {
        params: of({ locationId: "12345" }),
      };
      const fakeRouter: Partial<Router> = {
        url: "/edit-location",
      };

      await render(LocationFormPageComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
        componentProviders: [
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: Router, useValue: fakeRouter },
        ],
      });

      const renderedHeading = screen.queryByRole("heading", expectedHeading);

      expect(renderedHeading).toBeInTheDocument();
    });
  });
});
