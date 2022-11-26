import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { CredentialsPageComponent } from "./pages/credentials-page/credentials-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: CredentialsPageComponent },
  { path: "register", component: CredentialsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
