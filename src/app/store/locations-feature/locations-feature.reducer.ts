import { createFeature, createReducer, on } from "@ngrx/store";
import { deleteLocation, loadLocations } from "./locations-feature.actions";
import { LocationsState } from "./types";

const initialLocationsState: LocationsState = {
  count: 0,
  next: undefined,
  previous: undefined,
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
    ),

    on(
      deleteLocation,
      (currentState, { payload }): LocationsState => ({
        ...currentState,
        count: currentState.count - 1,
        locations: currentState.locations.filter(
          (location) => location.id !== payload
        ),
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectLocations,
  selectLocationsState,
  selectCount,
  selectNext,
  selectPrevious,
} = locationsFeature;
