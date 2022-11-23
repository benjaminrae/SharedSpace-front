import { UiState } from "src/app/store/ui-feature/types";

const mockInitialUiState: UiState = {
  showModal: false,
  isLoading: false,
  modalInformation: { isError: false, modalText: "" },
};

export default mockInitialUiState;
