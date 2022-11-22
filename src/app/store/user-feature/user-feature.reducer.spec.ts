import { type Action } from "@ngrx/store";
import { type UserState, type User } from "./types";
import { loginUser } from "./user-feature.actions";
import { userFeature } from "./user-feature.reducer";

const userReducer = userFeature.reducer;

describe("Given a userReducer", () => {
  const initialUserState: UserState = {
    id: "",
    isLogged: false,
    token: "",
    username: "",
  };

  describe("When it receives the initial user state and an unknown action", () => {
    test("Then it should return a copy of the initial state", () => {
      const unknownAction: Action = {
        type: "unknownAction",
      };

      const newState = userReducer(initialUserState, unknownAction);

      expect(newState).toStrictEqual(initialUserState);
    });
  });

  describe("When it receives the initial user state and a loginUser action with username 'admin', id '1234' and token 'testtoken'", () => {
    test("Then it should return a copy of the state with those values and isLogged true", () => {
      const loginUserPayload: User = {
        id: "1234",
        token: "testtoken",
        username: "admin",
      };

      const expectedUserState: UserState = {
        ...loginUserPayload,
        isLogged: true,
      };

      const newUserState = userReducer(
        initialUserState,
        loginUser({ payload: loginUserPayload })
      );

      expect(newUserState).toStrictEqual(expectedUserState);
    });
  });
});
