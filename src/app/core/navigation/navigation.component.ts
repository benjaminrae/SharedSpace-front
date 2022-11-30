import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../../services/token/token.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  isLogged$: Observable<boolean>;
  isOpen = false;

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

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
