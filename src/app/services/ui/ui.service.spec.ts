import { UiService } from "./ui.service";
import { getMockStore } from "@ngrx/store/testing";
import mockInitialUiState from "../../mocks/states/mockInitialUiState";
import { ApplicationState } from "../../store/types";
import mockInitialUserState from "../../mocks/states/mockInitialUserState";
import {
  hideLoading,
  hideModal,
  showLoading,
  showModal,
} from "../../store/ui-feature/ui-feature.actions";

const store = getMockStore<ApplicationState>({
  initialState: { ui: mockInitialUiState, user: mockInitialUserState },
});

const dispatchSpy = jest.spyOn(store, "dispatch");

describe("Given the service Ui Service", () => {
  const service = new UiService(store);

  describe("When it's method showLoading is invoked", () => {
    test("Then it should invoke the store's dispatch method with a show loading action", () => {
      service.showLoading();

      expect(dispatchSpy).toHaveBeenCalledWith(showLoading());
    });
  });

  describe("When it's method hideLoading is invoked", () => {
    test("Then it should invoke the store's dispatch method with a hide loading action", () => {
      service.hideLoading();

      expect(dispatchSpy).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("When it's method hideModal is invoked", () => {
    test("Then it should invoke the store's dispatch method with a hide modal action", () => {
      service.hideModal();

      expect(dispatchSpy).toHaveBeenCalledWith(hideModal());
    });
  });

  describe("When it's method showSuccessModal is invoked with text 'Changes saved'", () => {
    test("Then it should invoke the store's dispatch method with a show modal action, isError false and the modal text", () => {
      const modalText = "Changes saved";

      service.showSuccessModal(modalText);

      expect(dispatchSpy).toHaveBeenCalledWith(
        showModal({ payload: { isError: false, modalText } })
      );
    });
  });

  describe("When its method showErrorModal is invoked with text 'There was an error'", () => {
    test("Then it should invoke the store's dispatch method with a showModal action, isError true and the modal text", () => {
      const modalText = "There was an error";

      service.showErrorModal(modalText);

      expect(dispatchSpy).toHaveBeenCalledWith(
        showModal({ payload: { isError: true, modalText } })
      );
    });
  });
});
