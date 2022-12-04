import {
  EventEmitter,
  Output,
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
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
  @Input() routerLink!: string;
  @Output() onClick = new EventEmitter();
  @ViewChild("button", { read: ElementRef })
  button!: ElementRef<HTMLButtonElement>;

  className!: string;

  onClickButton(event: Event) {
    event.stopPropagation();
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
