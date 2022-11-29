import { createFeature, createReducer, on } from "@ngrx/store";
import { loadLocations } from "./locations-feature.actions";
import { LocationsState } from "./types";

const initialLocationsState: LocationsState = {
  locations: [],
};

export const locationsFeature = createFeature({
  name: "locations",
  reducer: createReducer(
    initialLocationsState,

    on(
      loadLocations,
      (currentState, { payload }): LocationsState => ({
        ...currentState,
        locations: payload,
      })
    )
  ),
});

export const { name, reducer, selectLocations, selectLocationsState } =
  locationsFeature;
