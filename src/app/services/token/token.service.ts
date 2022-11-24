import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { CustomTokenPayload } from "./types";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  decodeToken(token: string): CustomTokenPayload {
    return jwtDecode<CustomTokenPayload>(token);
  }
}
