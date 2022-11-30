import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading/loading.component";
import { ButtonComponent } from "./button/button.component";
import { ModalComponent } from "./modal/modal.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { NgIconsModule } from "@ng-icons/core";
import { iconoirMenu } from "@ng-icons/iconoir";

@NgModule({
  declarations: [
    LoadingComponent,
    ButtonComponent,
    ModalComponent,
    HeaderComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ iconoirMenu }),
  ],
  exports: [
    LoadingComponent,
    ButtonComponent,
    ModalComponent,
    HeaderComponent,
    NavigationComponent,
  ],
})
export class CoreModule {}
