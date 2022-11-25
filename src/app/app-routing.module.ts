import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
