import { EventEmitter, Output, Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() inverted!: boolean;
  @Input() big!: boolean;
  @Input() text = "Click here";
  @Input() type = "submit";
  @Input() disabled!: boolean;
  @Output() onClick = new EventEmitter<any>();

  className!: string;

  onClickButton(event: Event) {
    this.onClick.emit(event);
  }

  ngOnInit(): void {
    this.className = this.getClassName();
  }

  private getClassName() {
    return `button${this.inverted ? " button--inverted" : ""}${
      this.big ? " button--big" : ""
    }`;
  }
}
