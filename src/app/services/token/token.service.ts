import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { CustomTokenPayload } from "./types";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private get tokenProperty() {
    return "token";
  }

  decodeToken(token: string): CustomTokenPayload {
    return jwtDecode<CustomTokenPayload>(token);
  }

  storeToken(token: string) {
    localStorage.setItem(this.tokenProperty, token);
  }

  retrieveToken() {
    return localStorage.getItem(this.tokenProperty);
  }

  removeToken() {
    localStorage.removeItem(this.tokenProperty);
  }
}
