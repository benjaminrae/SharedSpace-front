import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading/loading.component";
import { ButtonComponent } from "./button/button.component";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
  declarations: [LoadingComponent, ButtonComponent, ModalComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, ButtonComponent, ModalComponent],
})
export class CoreModule {}
