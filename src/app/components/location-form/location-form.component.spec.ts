import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { render, screen } from "@testing-library/angular";
import { createMock } from "@testing-library/angular/jest-utils";
import userEvent from "@testing-library/user-event/";
import { MockProvider } from "ng-mocks";
import { LocationsService } from "../../services/locations/locations.service";
import { UiService } from "../../services/ui/ui.service";
import { ButtonComponent } from "../../core/button/button.component";

import { LocationFormComponent } from "./location-form.component";
import { provideMockStore } from "@ngrx/store/testing";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { getRandomLocation } from "../../factories/locationsFactory";
import { of } from "rxjs";

describe("Given a LocationFormComponent", () => {
  const imageAlt = /your image/i;
  const imageLabel = /image/i;
  const nameLabel = /name/i;
  const locationLabel = /location/i;
  const descriptionLabel = /description/i;
  const buttonText = /save location/i;

  describe("When it is rendered", () => {
    test("Then it should show a name, location description and image input", async () => {
      await render(LocationFormComponent, {
        providers: [FormBuilder, provideMockStore({}), HttpClient, HttpHandler],
      });

      const nameInput = screen.queryByRole("textbox", {
        name: nameLabel,
      });
      const locationInput = screen.queryByRole("textbox", {
        name: locationLabel,
      });
      const descriptionInput = screen.queryByRole("textbox", {
        name: descriptionLabel,
      });
      const imageInput = screen.queryByLabelText(imageLabel);

      expect(nameInput).toBeInTheDocument();
      expect(locationInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(imageInput).toBeInTheDocument();
    });

    test("And it should show 15 checkboxes", async () => {
      const totalCheckboxes = 16;

      await render(LocationFormComponent, {
        providers: [FormBuilder, provideMockStore({}), HttpClient, HttpHandler],
      });

      const checkboxes = screen.queryAllByRole("checkbox");

      expect(checkboxes).toHaveLength(totalCheckboxes);
    });

    test("And it should show a button 'Save location' which is disabled", async () => {
      await render(LocationFormComponent, {
        providers: [FormBuilder, provideMockStore({}), HttpClient, HttpHandler],
        declarations: [ButtonComponent],
      });

      const renderedButton = screen.queryByRole("button", {
        name: buttonText,
      });

      expect(renderedButton).toBeInTheDocument();
      expect(renderedButton).toBeDisabled();
    });

    test("And it should show an image with alt 'Your image'", async () => {
      await render(LocationFormComponent, {
        providers: [FormBuilder, provideMockStore({}), HttpClient, HttpHandler],
        declarations: [ButtonComponent],
      });

      const renderedImage = screen.queryByAltText(imageAlt);

      expect(renderedImage).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user uploads an image", () => {
    test("Then it should show a preview of the image", async () => {
      const image = new File(["image"], "image.png", { type: "image/png" });
      const sanitize = jest.fn().mockReturnValue({
        bypassSecurityTrustUrl: jest.fn().mockReturnValue(image.name),
      });
      URL.createObjectURL = jest.fn().mockReturnValue(image.name);

      await render(LocationFormComponent, {
        providers: [
          FormBuilder,
          MockProvider(DomSanitizer, { sanitize }),
          provideMockStore({}),
          HttpClient,
          HttpHandler,
        ],
        declarations: [ButtonComponent],
        detectChanges: true,
      });

      const renderedImage = screen.queryByAltText(imageAlt);
      const imageInput = screen.queryByLabelText(imageLabel);

      await userEvent.upload(imageInput!, image);

      expect((imageInput as HTMLInputElement).files!.length).toBe(1);
      expect((renderedImage as HTMLImageElement).src).toBe(
        "http://localhost/assets/svgs/image-preview.svg"
      );
    });
  });

  describe("When it is rendered and the user submits name 'SpaceHub', location 'Barcelona', description 'This is a cool place to work' and an image", () => {
    test("Then it should show and hide loading, show a success modal and navigate to home", async () => {
      const data = {
        subscribe: jest.fn().mockImplementation((callback: () => void) => {
          callback();
        }),
      };
      const locationService = createMock(LocationsService);
      locationService.addLocation = jest.fn().mockReturnValue(data);

      const uiService = createMock(UiService);

      const userInput = {
        name: "SpaceHub",
        location: "Barcelona",
        description: "This is a cool place to work",
      };

      await render(LocationFormComponent, {
        providers: [
          FormBuilder,
          provideMockStore({ initialState: { user: { token: "token" } } }),
          HttpClient,
          HttpHandler,
        ],
        declarations: [ButtonComponent],
        componentProviders: [
          { provide: LocationsService, useValue: locationService },
          { provide: UiService, useValue: uiService },
        ],
      });

      const imageInput = screen.queryByLabelText(imageLabel);

      const nameInput = screen.queryByRole("textbox", {
        name: nameLabel,
      });
      const locationInput = screen.queryByRole("textbox", {
        name: locationLabel,
      });
      const descriptionInput = screen.queryByRole("textbox", {
        name: descriptionLabel,
      });
      const form = screen.queryByTestId("form");

      expect(nameInput).toBeInTheDocument();

      await userEvent.type(nameInput!, userInput.name);
      await userEvent.type(locationInput!, userInput.location);
      await userEvent.type(descriptionInput!, userInput.description);
      await userEvent.upload(
        imageInput!,
        new File(["image"], "image.jpg", { type: "image/jpg" })
      );

      form?.dispatchEvent(new Event("ngSubmit"));

      expect(uiService.showLoading).toHaveBeenCalled();
      expect(locationService.addLocation).toHaveBeenCalled();
      expect(uiService.hideLoading).toHaveBeenCalled();
      expect(uiService.showSuccessModal).toHaveBeenCalled();
      expect(uiService.navigate).toHaveBeenCalledWith("/");
    });
  });

  describe("When it is rendered with a locationId '12345' and isEdit true", () => {
    test("Then it should show a the locations values in the inputs", async () => {
      const locationId = "12345";
      const isEdit = true;
      const locationsService = createMock(LocationsService);

      const location = getRandomLocation();

      locationsService.getLocationById = jest
        .fn()
        .mockReturnValue(of({ location }));

      await render(LocationFormComponent, {
        declarations: [ButtonComponent],
        providers: [HttpClient, HttpHandler, provideMockStore({}), Validators],
        componentProviders: [
          { provide: LocationsService, useValue: locationsService },
          { provide: FormBuilder },
        ],
        imports: [ReactiveFormsModule],
        componentProperties: {
          isEdit,
          locationId,
        },
      });

      const nameInput = screen.queryByRole("textbox", {
        name: nameLabel,
      });
      const locationInput = screen.queryByRole("textbox", {
        name: locationLabel,
      });
      const descriptionInput = screen.queryByRole("textbox", {
        name: descriptionLabel,
      });
      const image = screen.queryByRole("img");

      expect(nameInput).toHaveValue(location.name);
      expect(locationInput).toHaveValue(location.location);
      expect(descriptionInput).toHaveValue(location.description);
      expect((image as HTMLImageElement).src).toBe(location.images.image);
    });
  });

  describe("When it is rendered with a locationId '12345' and isEdit true", () => {
    test("Then it should invoke when the user changes the location to 'Madrid' and uploads a new image and submits the form", async () => {
      const locationId = "12345";
      const isEdit = true;
      const locationsService = createMock(LocationsService);
      const uiService = createMock(UiService);
      const newLocation = "Madrid";
      const newImage = new File(["image"], "image.jpg", { type: "image/jpg" });
      const data = {
        subscribe: jest.fn().mockImplementation((callback: () => void) => {
          callback();
        }),
      };
      locationsService.editLocation = jest.fn().mockReturnValue(data);

      const location = getRandomLocation();

      locationsService.getLocationById = jest
        .fn()
        .mockReturnValue(of({ location }));

      await render(LocationFormComponent, {
        declarations: [ButtonComponent],
        providers: [HttpClient, HttpHandler, provideMockStore({}), Validators],
        componentProviders: [
          { provide: LocationsService, useValue: locationsService },
          { provide: UiService, useValue: uiService },
          { provide: FormBuilder },
        ],
        imports: [ReactiveFormsModule],
        componentProperties: {
          isEdit,
          locationId,
        },
      });

      const locationInput = screen.queryByRole("textbox", {
        name: locationLabel,
      });
      const imageInput = screen.queryByLabelText(imageLabel);
      const form = screen.queryByTestId("form");

      await userEvent.type(locationInput!, newLocation);
      await userEvent.upload(imageInput!, newImage);

      form?.dispatchEvent(new Event("ngSubmit"));

      expect(uiService.showLoading).toHaveBeenCalled();
      expect(locationsService.editLocation).toHaveBeenCalled();
      expect(uiService.hideLoading).toHaveBeenCalled();
      expect(uiService.showSuccessModal).toHaveBeenCalled();
      expect(uiService.navigate).toHaveBeenCalledWith("/my-locations");
    });
  });
});
