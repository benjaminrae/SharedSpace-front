import { FormBuilder } from "@angular/forms";
import { render, screen } from "@testing-library/angular";

import { LocationFormComponent } from "./location-form.component";

describe("Given a LocationFormComponent", () => {
  describe("When it is rendered", () => {
    test("Then it should show a name, location description and image input", async () => {
      const nameLabel = /name/i;
      const locationLabel = /location/i;
      const descriptionLabel = /description/i;
      const imageLabel = /image/i;

      await render(LocationFormComponent, {
        providers: [FormBuilder],
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
      const totalCheckboxes = 15;

      await render(LocationFormComponent, {
        providers: [FormBuilder],
      });

      const checkboxes = screen.queryAllByRole("checkbox");

      expect(checkboxes).toHaveLength(totalCheckboxes);
    });
  });
});
