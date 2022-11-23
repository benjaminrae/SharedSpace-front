import { type Action } from "@ngrx/store";
import mockInitialUiState from "../../mocks/states/mockInitialUiState";
import { type UiState } from "./types";
import { hideLoading, showLoading } from "./ui-feature.actions";
import { uiFeature } from "./ui-feature.reducer";

const uiReducer = uiFeature.reducer;

describe("Given a uiReducer", () => {
  const initialUiState: UiState = mockInitialUiState;

  describe("When it receives the current ui state and an unknown action", () => {
    test("Then it should return a copy of the initial state", () => {
      const unknownAction: Action = {
        type: "unknown action",
      };

      const newUiState = uiReducer(initialUiState, unknownAction);

      expect(newUiState).toStrictEqual(initialUiState);
    });
  });

  describe("When it receives the current ui state with isLoading false and a showLoading action", () => {
    test("Then it should return a copy of the state with isLoading true", () => {
      const expectedUiState: UiState = {
        ...initialUiState,
        isLoading: true,
      };

      const newUiState = uiReducer(initialUiState, showLoading());

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });

  describe("When it receives a current state with isLoading true and a hideLoading action", () => {
    test("Then it should return a copy of the state with isLoading false", () => {
      const currentUiState: UiState = {
        ...initialUiState,
        isLoading: true,
      };

      const expectedUiState: UiState = {
        ...initialUiState,
        isLoading: false,
      };

      const newUiState = uiReducer(currentUiState, hideLoading());

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});
