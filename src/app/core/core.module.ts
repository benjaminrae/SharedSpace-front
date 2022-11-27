import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading/loading.component";
import { ButtonComponent } from "./button/button.component";
import { ModalComponent } from "./modal/modal.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  declarations: [
    LoadingComponent,
    ButtonComponent,
    ModalComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [LoadingComponent, ButtonComponent, ModalComponent, HeaderComponent],
})
export class CoreModule {}
