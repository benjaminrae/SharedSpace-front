import { createFeature, createReducer, on } from "@ngrx/store";
import { type UiState } from "./types";
import {
  hideLoading,
  hideModal,
  showLoading,
  showModal,
} from "./ui-feature.actions";

const intiialUiState: UiState = {
  isLoading: false,
  showModal: false,
  modalInformation: { isError: false, modalText: "" },
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
    ),

    on(
      hideLoading,
      (currentState): UiState => ({
        ...currentState,
        isLoading: false,
      })
    ),

    on(
      showModal,
      (currentState, { payload }): UiState => ({
        ...currentState,
        showModal: true,
        modalInformation: payload,
      })
    ),

    on(
      hideModal,
      (currentState): UiState => ({
        ...currentState,
        showModal: false,
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectIsLoading,
  selectUiState,
  selectModalInformation,
  selectShowModal,
} = uiFeature;
