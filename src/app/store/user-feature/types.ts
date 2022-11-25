export interface UserState extends User {
  isLogged: boolean;
}

export interface User extends Omit<UserCredentials, "password"> {
  id: string;
  token: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface RegisterUserCredentials extends UserCredentials {
  confirmPassword: string;
  owner: boolean;
}
