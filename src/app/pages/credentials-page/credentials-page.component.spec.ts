import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import { ButtonComponent } from "../../core/button/button.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { RouterTestingModule } from "@angular/router/testing";
import { CredentialsPageComponent } from "./credentials-page.component";
import { routes } from "../../app-routing.module";
import { Router } from "@angular/router";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";

const providers = [FormBuilder, HttpClient, HttpHandler, provideMockStore({})];
const declarations = [
  RegisterFormComponent,
  LoginFormComponent,
  ButtonComponent,
];

describe("Given the CredentialsPageComponent", () => {
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
  });
});

describe("Given the CredentialsPage component", () => {
  describe("When it is rendered and the path is /login", () => {
    test("Then it should match the snapshot", async () => {
      const { fixture, detectChanges } = await render(
        CredentialsPageComponent,
        {
          declarations,
          providers,
          imports: [RouterTestingModule.withRoutes(routes)],
          detectChanges: false,
        }
      );

      const router = TestBed.inject(Router);

      await fixture.ngZone!.run(async () => router.navigate(["/login"]));

      detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    test("And then it should show an image on the screen with name 'A man working at a desk' and a heading level 2 with 'Log in to SharedSpace'", async () => {
      const imageAltText = "A man working at a desk";
      const loginHeading = {
        level: 2,
        name: "Log in to SharedSpace",
      };

      const { fixture, detectChanges } = await render(
        CredentialsPageComponent,
        {
          declarations,
          providers,
          imports: [RouterTestingModule.withRoutes(routes)],
          detectChanges: false,
        }
      );

      const router = TestBed.inject(Router);

      await fixture.ngZone!.run(async () => router.navigate(["/login"]));

      detectChanges();

      const renderedHeading = screen.queryByRole("heading", loginHeading);
      const renderedImage = screen.queryByRole("img", {
        name: imageAltText,
      });

      expect(renderedHeading).toBeInTheDocument();
      expect(renderedImage).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the path is /register", () => {
    test("Then it should match the snapshot", async () => {
      const { fixture, detectChanges } = await render(
        CredentialsPageComponent,
        {
          declarations,
          providers,
          imports: [RouterTestingModule.withRoutes(routes)],
          detectChanges: false,
        }
      );

      const router = TestBed.inject(Router);

      await fixture.ngZone!.run(async () => router.navigate(["/register"]));

      detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    test("And then it should show an image on the screen with name 'A man working at a desk' and a heading level 2 with 'Sign up for SharedSpace'", async () => {
      const imageAltText = "A man working at a desk";
      const signupHeading = {
        level: 2,
        name: "Sign up for SharedSpace",
      };

      const { fixture, detectChanges } = await render(
        CredentialsPageComponent,
        {
          declarations,
          providers,
          imports: [RouterTestingModule.withRoutes(routes)],
          detectChanges: false,
        }
      );

      const router = TestBed.inject(Router);

      await fixture.ngZone!.run(async () => router.navigate(["/register"]));

      detectChanges();

      const renderedHeading = screen.queryByRole("heading", signupHeading);
      const renderedImage = screen.queryByRole("img", {
        name: imageAltText,
      });

      expect(renderedHeading).toBeInTheDocument();
      expect(renderedImage).toBeInTheDocument();
    });
  });
});
