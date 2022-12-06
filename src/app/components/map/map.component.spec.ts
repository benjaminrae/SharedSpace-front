import { HttpClient, HttpHandler } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { MapComponent } from "./map.component";

describe("Given a MapComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a map on the screen", async () => {
      await render(MapComponent, {
        providers: [HttpClient, HttpHandler, provideMockStore({})],
      });

      const renderedMap = screen.queryByTestId("map");

      screen.debug();

      expect(renderedMap).toBeInTheDocument();
    });
  });
});
