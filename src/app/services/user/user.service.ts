import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User, UserCredentials } from "../../store/user-feature/types";
import { TokenResponse } from "./types";
import { Store } from "@ngrx/store";
import { loginUser } from "../../store/user-feature/user-feature.actions";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private get userLoginPath() {
    return "/users/login";
  }

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ) {}

  getToken(loginFormData: UserCredentials) {
    return this.http.post<TokenResponse>(
      `${environment.apiUrl}${this.userLoginPath}`,
      loginFormData
    );
  }

  loginUser(userData: User) {
    this.store.dispatch(loginUser({ payload: userData }));
  }
}
