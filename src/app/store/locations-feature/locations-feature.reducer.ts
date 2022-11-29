import { createFeature, createReducer } from "@ngrx/store";
import { LocationsState } from "./types";

const initialLocationsState: LocationsState = {
  locations: [],
};

export const locationsFeature = createFeature({
  name: "locations",
  reducer: createReducer(initialLocationsState),
});

export const { name, reducer, selectLocations, selectLocationsState } =
  locationsFeature;
