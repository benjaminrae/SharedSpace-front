import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {
  RegisterUserCredentials,
  User,
  UserCredentials,
} from "../../store/user-feature/types";
import { RegisterResponse, TokenResponse } from "./types";
import { Store } from "@ngrx/store";
import { loginUser } from "../../store/user-feature/user-feature.actions";
import { UiService } from "../ui/ui.service";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private get userLoginPath() {
    return "/users/login";
  }

  private get userRegisterPath() {
    return "/users/register";
  }

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly uiService: UiService
  ) {}

  getToken(loginFormData: UserCredentials): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(
        `${environment.apiUrl}${this.userLoginPath}`,
        loginFormData
      )
      .pipe(catchError((error) => this.handleError(error, this.uiService)));
  }

  registerUser(
    registerFormData: RegisterUserCredentials
  ): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(
        `${environment.apiUrl}${this.userRegisterPath}`,
        registerFormData
      )
      .pipe(catchError((error) => this.handleError(error, this.uiService)));
  }

  loginUser(userData: User) {
    this.store.dispatch(loginUser({ payload: userData }));
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error.error) {
      uiService.showErrorModal(error.error.error);
      return throwError(() => error);
    }

    if (error.message) {
      uiService.showErrorModal(error.message);
    }

    return throwError(() => error);
  }
}
