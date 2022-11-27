import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event/";
import { routes } from "../../app-routing.module";
import { ButtonComponent } from "../../core/button/button.component";
import { NotFoundPageComponent } from "./not-found-page.component";

describe("Given the NotFoundPage component", () => {
  const buttonLabel = /go home/i;
  const pageNotFound = /page not found/i;
  const expectedHeading = {
    level: 2,
    name: pageNotFound,
  };

  describe("When it is rendered", () => {
    test("Then it should show a heading level 2 on the screen with 'Page not found', an image with alt 'Page not found' and a button 'Go home'", async () => {
      await render(NotFoundPageComponent, {
        declarations: [ButtonComponent],
      });

      const renderedButton = screen.queryByRole("button", {
        name: buttonLabel,
      });
      const renderedHeading = screen.queryByRole("heading", expectedHeading);
      const renderedImage = screen.queryByRole("img", {
        name: pageNotFound,
      });

      expect(renderedButton).toBeInTheDocument();
      expect(renderedHeading).toBeInTheDocument();
      expect(renderedImage).toBeInTheDocument();
    });

    test("And then it should navigate when the button is clicked", async () => {
      await render(NotFoundPageComponent, {
        declarations: [ButtonComponent],
        imports: [RouterTestingModule.withRoutes(routes)],
        detectChanges: false,
      });

      const router = TestBed.inject(Router);

      const renderedButton = screen.queryByRole("button", {
        name: buttonLabel,
      });

      await userEvent.click(renderedButton!);

      expect(router.navigated).toBe(true);
    });
  });
});
