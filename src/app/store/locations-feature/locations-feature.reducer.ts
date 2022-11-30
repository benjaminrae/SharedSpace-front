import { createFeature, createReducer, on } from "@ngrx/store";
import { loadLocations } from "./locations-feature.actions";
import { LocationsState } from "./types";

const initialLocationsState: LocationsState = {
  count: 0,
  next: "",
  previous: "",
  locations: [],
};

export const locationsFeature = createFeature({
  name: "locations",
  reducer: createReducer(
    initialLocationsState,

    on(
      loadLocations,
      (
        currentState,
        { payload: { count, locations, next, previous } }
      ): LocationsState => ({
        ...currentState,
        count,
        locations,
        next,
        previous,
      })
    )
  ),
});

export const { name, reducer, selectLocations, selectLocationsState } =
  locationsFeature;
