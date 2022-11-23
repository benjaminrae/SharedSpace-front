import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectIsLoading } from "src/app/store/ui-feature/ui-feature.reducer";

@Injectable({
  providedIn: "root",
})
export class UiService {
  constructor(private readonly store: Store) {}

  getLoadingValue(): Observable<boolean> {
    return this.store.select(selectIsLoading);
  }
}
