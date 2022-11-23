import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { userFeature } from "./user-feature.reducer";

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(userFeature)],
})
export class UserFeatureModule {}
