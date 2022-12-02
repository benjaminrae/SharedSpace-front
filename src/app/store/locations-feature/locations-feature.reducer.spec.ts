import { Action } from "@ngrx/store";
import {
  getRandomLocation,
  getRandomLocations,
} from "../../factories/locationsFactory";
import { deleteLocation, loadLocations } from "./locations-feature.actions";
import { locationsFeature } from "./locations-feature.reducer";
import { LocationsState } from "./types";

const locationsReducer = locationsFeature.reducer;

describe("Given a locationsReducer", () => {
  const initialLocationsState: LocationsState = {
    locations: [],
    count: 0,
    next: "",
    previous: "",
  };

  describe("When it receives the current locations state and an unknown action", () => {
    test("Then it should return a copy of the state with no changes", () => {
      const unknownAction: Action = {
        type: "unknown action",
      };

      const newLocationsState = locationsReducer(
        initialLocationsState,
        unknownAction
      );

      expect(newLocationsState).toStrictEqual(initialLocationsState);
    });
  });

  describe("When it receives an initial state and a loadLocations action with 3 locations in the payload", () => {
    test("Then it should return a copy of the state with with received locations", () => {
      const count = 3;
      const newLocations = getRandomLocations(count);
      const next = "";
      const previous = "";

      const expectedLocationState: LocationsState = {
        locations: newLocations,
        count,
        next,
        previous,
      };

      const newLocationsState: LocationsState = locationsReducer(
        initialLocationsState,
        loadLocations({
          payload: { locations: newLocations, count, next, previous },
        })
      );

      expect(newLocationsState).toStrictEqual(expectedLocationState);
    });
  });

  describe("When it receives an initial state with one stored location and it receives a deleteLocation action with that location's id", () => {
    test("Then it should return a copy of the state without that location", () => {
      const locationToDelete = getRandomLocation();

      const expectedLocationState = initialLocationsState;

      const initialState: LocationsState = {
        ...initialLocationsState,
        locations: [locationToDelete],
        count: 1,
      };

      const newLocationsState = locationsReducer(
        initialState,
        deleteLocation({ payload: locationToDelete.id })
      );

      expect(newLocationsState).toStrictEqual(expectedLocationState);
    });
  });
});
