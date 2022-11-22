import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { userFeature, userFeatureKey } from "./user-feature.reducer";

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(userFeatureKey, userFeature.reducer)],
})
export class UserFeatureModule {}
