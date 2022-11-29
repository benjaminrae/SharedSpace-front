import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";
import { UiService } from "../../services/ui/ui.service";
import { Modal } from "../../store/ui-feature/types";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild(ButtonComponent) component!: ButtonComponent;
  buttonRef!: ElementRef<HTMLButtonElement>;

  modalInformation$!: Observable<Modal>;

  constructor(private readonly uiService: UiService) {
    this.modalInformation$ = uiService.getModalInformation();
  }

  ngAfterViewInit(): void {
    this.component.button.nativeElement.focus();
  }

  onClick() {
    this.uiService.hideModal();
  }
}
