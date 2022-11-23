import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  showModal,
  hideModal,
} from "../../store/ui-feature/ui-feature.actions";
import { selectIsLoading } from "../../store/ui-feature/ui-feature.reducer";

@Injectable({
  providedIn: "root",
})
export class UiService {
  constructor(private readonly store: Store) {}

  getLoadingValue(): Observable<boolean> {
    return this.store.select(selectIsLoading);
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
}
