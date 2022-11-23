import { createAction, props } from "@ngrx/store";
import { Modal } from "./types";

export const showLoading = createAction("[UI] Show loading");

export const hideLoading = createAction("[UI] Hide loading");

export const showModal = createAction(
  "[UI] Show modal",
  props<{ payload: Modal }>()
);

export const hideModal = createAction("[UI] Hide modal");
