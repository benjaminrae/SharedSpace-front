export interface UserState extends User {
  isLogged: boolean;
}

export interface User {
  username: string;
  id: string;
  token: string;
}
