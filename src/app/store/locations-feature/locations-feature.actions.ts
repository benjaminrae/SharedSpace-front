import { createAction, props } from "@ngrx/store";
import { Locations } from "./types";

export const loadLocations = createAction(
  "[LOCATIONS] Load locations",
  props<{ payload: Locations }>
);
