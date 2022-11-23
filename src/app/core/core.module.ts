import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading/loading.component";
import { ButtonComponent } from "./button/button.component";

@NgModule({
  declarations: [LoadingComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, ButtonComponent],
})
export class CoreModule {}
