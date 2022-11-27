import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../../services/token/token.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogged$: Observable<boolean>;

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {
    this.isLogged$ = this.userService.getIsLogged();
  }

  onClick() {
    this.userService.logoutUser();
    this.tokenService.removeToken();
  }
}
