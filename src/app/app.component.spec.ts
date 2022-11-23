import { render, screen } from "@testing-library/angular";
import { AppComponent } from "./app.component";
import { UiService } from "./services/ui/ui.service";
import { provideMockStore } from "@ngrx/store/testing";

describe("Given an AppComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading level 1 with 'SharedSpace' on the screen", async () => {
      const expectedHeading = {
        level: 1,
        name: "SharedSpace",
      };

      await render(AppComponent, {
        providers: [UiService, provideMockStore({})],
      });

      const renderedHeading = screen.getByRole("heading", expectedHeading);

      expect(renderedHeading).toBeInTheDocument();
    });
  });
});
