import { UserState } from "src/app/store/user-feature/types";

const mockInitialUserState: UserState = {
  id: "",
  isLogged: false,
  token: "",
  username: "",
  owner: false,
};

export default mockInitialUserState;
