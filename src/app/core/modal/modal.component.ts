import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { UiService } from "src/app/services/ui/ui.service";
import { Modal } from "src/app/store/ui-feature/types";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  modalInformation$!: Observable<Modal>;

  constructor(uiService: UiService) {
    this.modalInformation$ = uiService.getModalInformation();
  }
}
