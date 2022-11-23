import { Component } from "@angular/core";
import { type Observable } from "rxjs";
import { UiService } from "./services/ui/ui.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [UiService],
})
export class AppComponent {
  isLoading$: Observable<boolean>;
  showModal$: Observable<boolean>;

  constructor(private readonly uiService: UiService) {
    this.isLoading$ = this.uiService.getLoadingValue();
    this.showModal$ = this.uiService.getShowModalValue();
  }
}
