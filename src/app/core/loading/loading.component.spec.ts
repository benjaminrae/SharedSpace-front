import { render, screen } from "@testing-library/angular";
import { LoadingComponent } from "./loading.component";

describe("Given a Loading component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a loading animation on the screen with role 'alert' and aria-label 'The page is loading'", async () => {
      const expectedRole = "alert";
      const expectedLabel = "The page is loading";

      await render(LoadingComponent);

      const renderedLoading = screen.queryByRole(expectedRole, {
        name: expectedLabel,
      });

      expect(renderedLoading).toBeInTheDocument();
    });
  });
});
