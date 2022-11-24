import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User, UserCredentials } from "../../store/user-feature/types";
import { TokenResponse } from "./types";
import { Store } from "@ngrx/store";
import { loginUser } from "../../store/user-feature/user-feature.actions";
import { UiService } from "../ui/ui.service";
import { catchError, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private get userLoginPath() {
    return "/users/login";
  }

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly uiService: UiService
  ) {}

  getToken(loginFormData: UserCredentials): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      `${environment.apiUrl}${this.userLoginPath}`,
      loginFormData
    );
  }

  loginUser(userData: User) {
    this.store.dispatch(loginUser({ payload: userData }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.uiService.showErrorModal("Something went wrong, try again later");
      return;
    }

    this.uiService.showErrorModal(`There was an error: ${error.message}`);
  }
}
