import mockLocalStorage from "../../mocks/states/localStorage/mockLocalStorage";
import { TokenService } from "./token.service";

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

beforeEach(() => {
  mockLocalStorage.clear();
});

describe("Given the service TokenService", () => {
  const tokenService = new TokenService();
  const tokenProperty = "token";

  describe("When it's method store token is invoked with '1234'", () => {
    test("Then '1234' should be stored in local storage", () => {
      const token = "1234";

      tokenService.storeToken(token);

      expect(mockLocalStorage.getItem(tokenProperty)).toBe(token);
    });
  });

  describe("When it's method retrieve token is invoked and the token 'testtoken' is in localStorage", () => {
    const token = "testtoken";

    beforeEach(() => {
      mockLocalStorage.setItem(tokenProperty, token);
    });

    test("Then it should return the stored token", () => {
      const retrievedToken = tokenService.retrieveToken();

      expect(retrievedToken).toBe(token);
    });
  });
});
