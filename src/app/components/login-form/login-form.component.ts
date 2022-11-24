import { Component } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { TokenService } from "src/app/services/token/token.service";
import { UiService } from "src/app/services/ui/ui.service";
import { UserService } from "src/app/services/user/user.service";
import { UserCredentials } from "src/app/store/user-feature/types";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(5)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly uiService: UiService,
    private readonly tokenService: TokenService
  ) {}

  onSubmit() {
    this.uiService.showLoading();

    const data = this.userService.getToken(
      this.loginForm.value as UserCredentials
    );

    data.subscribe((data) => {
      const { token } = data;
      const { id, username } = this.tokenService.decodeToken(token);
      this.userService.loginUser({ username, id, token });
      this.uiService.hideLoading();
      this.resetForm();
      this.uiService.showSuccessModal("You have logged in correctly");
    });
  }

  private resetForm() {
    this.loginForm.reset();
  }
}
