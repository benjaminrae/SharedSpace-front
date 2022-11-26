import { createAction, props } from "@ngrx/store";
import { User } from "./types";

export const loginUser = createAction(
  "[USER] Login user",
  props<{ payload: User }>()
);

export const logoutUser = createAction("[USER] Logout user");
