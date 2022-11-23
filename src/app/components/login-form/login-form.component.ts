import { Component } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: [""],
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(5)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  constructor(private readonly fb: FormBuilder) {}

  onSubmit() {
    return this.loginForm.value;
  }
}
