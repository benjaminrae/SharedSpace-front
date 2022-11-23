import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getToken() {
    return this.http.post();
  }
}
