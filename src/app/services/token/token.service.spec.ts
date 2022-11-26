import mockToken from "../../mocks/states/mockToken";
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
    const token = mockToken;

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

  describe("When its method removeToken is invoked and there is a token in local storage", () => {
    beforeEach(() => {
      mockLocalStorage.setItem(tokenProperty, mockToken);
    });

    test("Then it the token should be removed from local storage", () => {
      tokenService.removeToken();

      expect(mockLocalStorage.getItem(tokenProperty)).toBe(undefined);
    });
  });
});
