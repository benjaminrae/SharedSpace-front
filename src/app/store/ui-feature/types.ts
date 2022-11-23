export interface UiState {
  isLoading: boolean;
  showModal: boolean;
  modalInformation: Modal;
}

export interface Modal {
  isError: boolean;
  modalText: string;
}
