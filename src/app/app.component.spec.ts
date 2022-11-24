import { render, screen } from "@testing-library/angular";
import { AppComponent } from "./app.component";
import { UiService } from "./services/ui/ui.service";
import { provideMockStore } from "@ngrx/store/testing";
import { TokenService } from "./services/token/token.service";
import { UserService } from "./services/user/user.service";
import { HttpClient, HttpHandler } from "@angular/common/http";

const providers = [
  UiService,
  TokenService,
  UiService,
  UserService,
  HttpClient,
  HttpHandler,
  provideMockStore({}),
];

describe("Given an AppComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading level 1 with 'SharedSpace' on the screen", async () => {
      const expectedHeading = {
        level: 1,
        name: "SharedSpace",
      };

      await render(AppComponent, {
        providers,
      });

      const renderedHeading = screen.getByRole("heading", expectedHeading);

      expect(renderedHeading).toBeInTheDocument();
    });
  });
});
