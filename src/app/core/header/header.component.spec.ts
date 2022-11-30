import { render, screen } from "@testing-library/angular";
import { HeaderComponent } from "./header.component";

describe("Given a Header component", () => {
  describe("When it is rendered and there isn't a user logged in", () => {
    test("Then it should show a heading level 1 'SharedSpace', and links 'Home', 'Login' and 'Register'", async () => {
      const expectedHeading = /sharedspace/i;

      await render(HeaderComponent);

      const renderedHeading = screen.queryByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(renderedHeading).toBeInTheDocument();
    });
  });
});
