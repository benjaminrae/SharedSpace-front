import { Component } from "@angular/core";
import { type Observable } from "rxjs";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Store } from "@ngrx/store";
import {
  selectIsLoading,
  reducer,
} from "src/app/store/ui-feature/ui-feature.reducer";
import { type ApplicationState } from "src/app/store/types";
import { map } from "rxjs";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent {}
