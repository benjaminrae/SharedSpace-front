import { EventEmitter, Output, Component, Input } from "@angular/core";
@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Input() inverted!: boolean;
  @Input() text = "Click here";
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event: Event) {
    this.onClick.emit(event);
  }
}
