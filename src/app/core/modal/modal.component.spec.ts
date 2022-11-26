import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { createMock } from "@testing-library/angular/jest-utils";
import userEvent from "@testing-library/user-event";
import { ApplicationState } from "src/app/store/types";
import { UiService } from "../../services/ui/ui.service";
import { Modal, UiState } from "../../store/ui-feature/types";
import { ButtonComponent } from "../button/button.component";
import { ModalComponent } from "./modal.component";

describe("Given a modal component", () => {
  const errorModal: Modal = {
    isError: true,
    modalText: "There was an error",
  };

  const mockUiState: UiState = {
    isLoading: false,
    showModal: true,
    modalInformation: errorModal,
  };

  const initialState = {
    ui: mockUiState,
  };
  const buttonText = /close/i;

  describe("When it is rendered and the store has modal information isError true and modalText 'There was an error'", () => {
    test("Then it should show 'Error', 'There was an error' and a button 'Close' on the screen", async () => {
      const modalTitle = /^error$/i;

      await render(ModalComponent, {
        providers: [UiService, provideMockStore({ initialState })],
        declarations: [ButtonComponent],
      });

      const renderedModalTitle = screen.queryByText(modalTitle);
      const renderedModalText = screen.queryByText(errorModal.modalText);
      const renderedButton = screen.queryByRole("button", { name: buttonText });

      expect(renderedModalTitle).toBeInTheDocument();
      expect(renderedModalText).toBeInTheDocument();
      expect(renderedButton).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the store has modal information isError false and modal text 'Submitted successfully'", () => {
    test("Then it should show 'Success and 'Submitted successfully' on the screen", async () => {
      const modalTitle = /^success$/i;
      const successModal: Modal = {
        isError: false,
        modalText: "Submitted successfully",
      };

      const mockUiState: UiState = {
        isLoading: false,
        showModal: true,
        modalInformation: successModal,
      };

      const initialState = {
        ui: mockUiState,
      };

      await render(ModalComponent, {
        providers: [UiService, provideMockStore({ initialState })],
        declarations: [ButtonComponent],
      });

      const renderedModalTitle = screen.queryByText(modalTitle);
      const renderedModalText = screen.queryByText(successModal.modalText);

      expect(renderedModalTitle).toBeInTheDocument();
      expect(renderedModalText).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user clicks close", () => {
    test("Then uiService's hideModal method should be invoked", async () => {
      const uiService = createMock(UiService);

      await render(ModalComponent, {
        providers: [provideMockStore({ initialState })],
        declarations: [ButtonComponent],
        componentProviders: [{ provide: UiService, useValue: uiService }],
      });

      const renderedButton = screen.queryByRole("button", {
        name: buttonText,
      });

      await userEvent.click(renderedButton!);

      expect(uiService.hideModal).toHaveBeenCalled();
    });
  });
});
