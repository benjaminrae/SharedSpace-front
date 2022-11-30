import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { CoreModule } from "./core/core.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UiService } from "./services/ui/ui.service";
import { AppComponent } from "./app.component";
import { metaReducers, reducers } from "./store";
import { CredentialsPageComponent } from "./pages/credentials-page/credentials-page.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LocationCardComponent } from "./components/location-card/location-card.component";
import { NgIconsModule } from "@ng-icons/core";
import { iconoirPinAlt } from "@ng-icons/iconoir";
import { LocationListComponent } from './components/location-list/location-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CredentialsPageComponent,
    RegisterFormComponent,
    NotFoundPageComponent,
    LayoutComponent,
    HomePageComponent,
    LocationCardComponent,
    LocationListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ iconoirPinAlt }),
  ],
  providers: [UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
