import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { uiFeature } from "./ui-feature.reducer";

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(uiFeature)],
})
export class UiFeatureModule {}
