import { JwtPayload } from "jwt-decode";

export interface CustomTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
