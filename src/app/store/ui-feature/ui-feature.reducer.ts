import { createFeature, createReducer, on } from "@ngrx/store";
import mockInitialUiState from "../../mocks/states/mockInitialUiState";
import { type UiState } from "./types";
import { hideLoading, showLoading } from "./ui-feature.actions";

const intiialUiState: UiState = mockInitialUiState;

export const uiFeature = createFeature({
  name: "ui",
  reducer: createReducer(
    intiialUiState,

    on(
      showLoading,
      (currentState): UiState => ({
        ...currentState,
        isLoading: true,
      })
    ),

    on(
      hideLoading,
      (currentState): UiState => ({
        ...currentState,
        isLoading: false,
      })
    )
  ),
});

export const { name, reducer, selectIsLoading, selectUiState } = uiFeature;
