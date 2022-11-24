import { rest } from "msw";
import { environment } from "../../environments/environment";

const { apiUrl } = environment;

export const handlers = [
  rest.post(`${apiUrl}/users/login`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ token: "testtoken" }))
  ),
];
