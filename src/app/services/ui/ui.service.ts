import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Modal } from "src/app/store/ui-feature/types";
import {
  showModal,
  hideModal,
  showLoading,
  hideLoading,
} from "../../store/ui-feature/ui-feature.actions";
import {
  selectIsLoading,
  selectModalInformation,
  selectShowModal,
} from "../../store/ui-feature/ui-feature.reducer";

@Injectable({
  providedIn: "root",
})
export class UiService {
  constructor(private readonly store: Store, private readonly router: Router) {}

  getLoadingValue(): Observable<boolean> {
    return this.store.select(selectIsLoading);
  }

  getShowModalValue(): Observable<boolean> {
    return this.store.select(selectShowModal);
  }

  getModalInformation(): Observable<Modal> {
    return this.store.select(selectModalInformation);
  }

  showLoading() {
    this.store.dispatch(showLoading());
  }

  hideLoading() {
    this.store.dispatch(hideLoading());
  }

  showErrorModal(errorText: string) {
    this.store.dispatch(
      showModal({ payload: { isError: true, modalText: errorText } })
    );
  }

  showSuccessModal(successText: string) {
    this.store.dispatch(
      showModal({ payload: { isError: false, modalText: successText } })
    );
  }

  hideModal() {
    this.store.dispatch(hideModal());
  }

  async navigate(route: string) {
    await this.router.navigate([route]);
  }
}
