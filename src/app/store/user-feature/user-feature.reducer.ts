import { createFeature, createReducer, on } from "@ngrx/store";
import { loginUser } from "./user-feature.actions";
import { type UserState } from "./types";

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
    )
  ),
});

export const {
  name: userFeatureKey,
  reducer,
  selectUserState,
  selectIsLogged,
  selectToken,
  selectId,
  selectUsername,
} = userFeature;
