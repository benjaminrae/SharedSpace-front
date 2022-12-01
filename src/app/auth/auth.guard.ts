import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  isLogged = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin();
  }

  checkLogin() {
    const isLogged$ = this.userService.getIsLogged();

    isLogged$.subscribe((data) => {
      this.isLogged = data;
    });

    if (!this.isLogged) {
      (async () => this.router.navigate(["/login"]))();
    }

    return this.isLogged;
  }
}
