import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { CredentialsPageComponent } from "./pages/credentials-page/credentials-page.component";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: CredentialsPageComponent },
  { path: "register", component: CredentialsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
