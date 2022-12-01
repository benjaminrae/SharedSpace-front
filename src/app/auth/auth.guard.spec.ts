import { Router } from "@angular/router";
import { createMock } from "@testing-library/angular/jest-utils";
import { of } from "rxjs";
import { UserService } from "../services/user/user.service";

import { AuthGuard } from "./auth.guard";

describe("Given the AuthGuard guard", () => {
  describe("When its method canActivate is invoked and there is a user logged in", () => {
    test("Then it should return true", () => {
      const userService = createMock(UserService);
      userService.getIsLogged = jest.fn().mockReturnValue(of(true));
      const router = createMock(Router);

      const guard = new AuthGuard(userService, router);

      const guardResult = guard.canActivate();

      expect(guardResult).toBe(true);
    });
  });

  describe("When its method canActivate is invoked and there isn't a user logged in", () => {
    test("Then it should return false", () => {
      const userService = createMock(UserService);
      userService.getIsLogged = jest.fn().mockReturnValue(of(false));
      const router = createMock(Router);

      const guard = new AuthGuard(userService, router);

      const guardResult = guard.canActivate();

      expect(guardResult).toBe(false);
    });
  });
});
