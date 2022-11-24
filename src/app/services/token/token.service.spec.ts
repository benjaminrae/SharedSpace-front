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

  describe("When its method store token is invoked with '1234'", () => {
    test("Then '1234' should be stored in local storage", () => {
      const token = "1234";

      tokenService.storeToken(token);

      expect(mockLocalStorage.getItem(tokenProperty)).toBe(token);
    });
  });

  describe("When its method retrieve token is invoked and the token 'testtoken' is in localStorage", () => {
    const token = "testtoken";

    beforeEach(() => {
      mockLocalStorage.setItem(tokenProperty, token);
    });

    test("Then it should return the stored token", () => {
      const retrievedToken = tokenService.retrieveToken();

      expect(retrievedToken).toBe(token);
    });
  });

  describe("When its method decodeToken is invoked with a token that has username 'admin' and id 'testid' in the payload", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiJ0ZXN0aWQifQ.O2baxQ7ITyRYos-PfeswyIx4tyA3_OviE1nR5Ytgoxo";

    test("Then it should return those properties", () => {
      const idProperty = "id";
      const usernameProperty = "username";
      const username = "admin";
      const id = "testid";

      const decodedToken = tokenService.decodeToken(token);

      expect(decodedToken).toHaveProperty(usernameProperty, username);
      expect(decodedToken).toHaveProperty(idProperty, id);
    });
  });
});
