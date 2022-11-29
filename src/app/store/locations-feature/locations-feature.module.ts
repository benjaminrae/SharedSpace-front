import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { locationsFeature } from "./locations-feature.reducer";

@NgModule({
  declarations: [],
  imports: [[StoreModule.forFeature(locationsFeature)]],
})
export class LocationsFeatureModule {}
