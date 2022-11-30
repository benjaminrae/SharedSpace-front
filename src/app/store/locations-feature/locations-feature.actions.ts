import { createAction, props } from "@ngrx/store";
import { LocationsState } from "./types";

export const loadLocations = createAction(
  "[LOCATIONS] Load locations",
  props<{ payload: LocationsState }>()
);
