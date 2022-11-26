import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-credentials-page",
  templateUrl: "./credentials-page.component.html",
  styleUrls: ["./credentials-page.component.scss"],
})
export class CredentialsPageComponent implements OnInit {
  page!: "/login" | "/register";

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.page = this.router.url as "/login" | "/register";
  }
}
