import { createAction, props } from "@ngrx/store";
import { type User } from "./types";

export const loginUser = createAction(
  "[USER] Login user",
  props<{ payload: User }>()
);
