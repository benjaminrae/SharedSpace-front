import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { provideMockStore } from "@ngrx/store/testing";

import { RegisterFormComponent } from "./register-form.component";

const providers = [FormBuilder, HttpClient, HttpHandler, provideMockStore({})];

describe("RegisterFormComponent", () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      providers,
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
