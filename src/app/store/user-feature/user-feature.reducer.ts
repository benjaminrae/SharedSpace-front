import { createFeature, createReducer, on } from "@ngrx/store";
import { loginUser, logoutUser } from "./user-feature.actions";
import { UserState } from "./types";

const initialUserState: UserState = {
  username: "",
  id: "",
  token: "",
  isLogged: false,
};

export const userFeature = createFeature({
  name: "user",
  reducer: createReducer(
    initialUserState,

    on(
      loginUser,
      (currentState, { payload }): UserState => ({
        ...currentState,
        ...payload,
        isLogged: true,
      })
    ),

    on(
      logoutUser,
      (currentState): UserState => ({
        ...currentState,
        username: "",
        id: "",
        token: "",
        isLogged: false,
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectUserState,
  selectIsLogged,
  selectToken,
  selectId,
  selectUsername,
} = userFeature;
