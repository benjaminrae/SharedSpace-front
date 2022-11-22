import { type UiState } from "./ui-feature/types";
import { type UserState } from "./user-feature/types";

export interface ApplicationState {
  user: UserState;
  ui: UiState;
}
