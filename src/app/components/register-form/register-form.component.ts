import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
})
export class RegisterFormComponent {
  registerForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(5)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
    owner: [false],
  });

  constructor(private readonly fb: FormBuilder) {}

  onSubmit() {
    return this.registerForm.value;
  }
}
