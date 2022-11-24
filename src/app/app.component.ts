import { Component, OnInit } from "@angular/core";
import { type Observable } from "rxjs";
import { TokenService } from "./services/token/token.service";
import { UiService } from "./services/ui/ui.service";
import { UserService } from "./services/user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [UiService],
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  showModal$: Observable<boolean>;

  constructor(
    private readonly uiService: UiService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {
    this.isLoading$ = this.uiService.getLoadingValue();
    this.showModal$ = this.uiService.getShowModalValue();
  }

  ngOnInit(): void {
    this.checkLoggedUser();
  }

  private checkLoggedUser() {
    const token = this.tokenService.retrieveToken();

    if (token) {
      const user = this.tokenService.decodeToken(token);

      this.userService.loginUser({ ...user, token });
    }
  }
}
