import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UiService } from "../../services/ui/ui.service";
import { RegisterUserCredentials } from "../../store/user-feature/types";
import { UserService } from "../../services/user/user.service";

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly uiService: UiService
  ) {}

  onSubmit() {
    this.uiService.showLoading();

    const data = this.userService.registerUser(
      this.registerForm.value as RegisterUserCredentials
    );

    data.subscribe((data) => {
      this.uiService.hideLoading();
      this.uiService.showSuccessModal("You have successfully registered");
      this.resetForm();
    });
  }

  private resetForm() {
    this.registerForm.reset();
  }
}
