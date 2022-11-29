import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { CredentialsPageComponent } from "./pages/credentials-page/credentials-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "locations", redirectTo: "", pathMatch: "full" },
  { path: "login", component: CredentialsPageComponent },
  { path: "register", component: CredentialsPageComponent },
  { path: "**", component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
