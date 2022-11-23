import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { metaReducers } from "./store";
import { EffectsModule } from "@ngrx/effects";
import { CoreModule } from "./core/core.module";
import { uiFeature } from "./store/ui-feature/ui-feature.reducer";
import { userFeature } from "./store/user-feature/user-feature.reducer";
import { UiService } from "./services/ui/ui.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(
      { ui: uiFeature.reducer, user: userFeature.reducer },
      { metaReducers }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    CoreModule,
  ],
  providers: [UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
