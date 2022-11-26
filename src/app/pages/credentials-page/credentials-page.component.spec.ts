import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { ButtonComponent } from "../../core/button/button.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";

import { CredentialsPageComponent } from "./credentials-page.component";

const providers = [FormBuilder, HttpClient, HttpHandler, provideMockStore({})];
const declarations = [LoginFormComponent, ButtonComponent];

describe("Given the LoginPageComponent", () => {
  let component: CredentialsPageComponent;
  let fixture: ComponentFixture<CredentialsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredentialsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("When it is rendered", () => {
    test("Then the component should be created", () => {
      expect(component).toBeTruthy();
    });

    test("and then it should match the snapshot", () => {
      expect(component).toMatchSnapshot();
    });
  });
});

describe("Given the LoginPage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show an image on the screen with name 'A man working at a desk' and a heading level 2 with 'Log in to SharedSpace'", async () => {
      const imageAltText = "A man working at a desk";
      const loginHeading = {
        level: 2,
        name: "Log in to SharedSpace",
      };

      await render(CredentialsPageComponent, { declarations, providers });

      const renderedHeading = screen.queryByRole("heading", loginHeading);
      const renderedImage = screen.queryByRole("img", {
        name: imageAltText,
      });

      expect(renderedHeading).toBeInTheDocument();
      expect(renderedImage).toBeInTheDocument();
    });
  });
});
