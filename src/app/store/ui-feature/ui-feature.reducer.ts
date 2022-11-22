import { createFeature, createReducer, on } from "@ngrx/store";
import { type UiState } from "./types";
import { showLoading } from "./ui-feature.actions";

const intiialUiState: UiState = {
  isLoading: false,
};

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
    )
  ),
});

export const { name, reducer, selectIsLoading, selectUiState } = uiFeature;
