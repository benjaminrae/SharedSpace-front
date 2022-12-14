import { createAction, props } from "@ngrx/store";
import { LocationsState } from "./types";

export const loadLocations = createAction(
  "[LOCATIONS] Load locations",
  props<{ payload: LocationsState }>()
);

export const loadMoreLocations = createAction(
  "[LOCATIONS] Load more locations",
  props<{ payload: LocationsState }>()
);

export const deleteLocation = createAction(
  "[LOCATIONS] Delete location",
  props<{ payload: string }>()
);
