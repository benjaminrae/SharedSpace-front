import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { CoreModule } from "./core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UiService } from "./services/ui/ui.service";
import { AppComponent } from "./app.component";
import { metaReducers } from "./store";
import { uiFeature } from "./store/ui-feature/ui-feature.reducer";
import { userFeature } from "./store/user-feature/user-feature.reducer";
import { LoginFormComponent } from "./components/login-form/login-form.component";
@NgModule({
  declarations: [AppComponent, LoginFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    ReactiveFormsModule,
  ],
  providers: [UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
