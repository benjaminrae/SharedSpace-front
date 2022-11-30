import { LocationStructure } from "src/app/store/locations-feature/types";

export interface LocationForm
  extends Omit<LocationStructure, "images" | "owner"> {
  image: File;
}
