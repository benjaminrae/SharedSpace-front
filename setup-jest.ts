import "jest-preset-angular/setup-jest";
import "@testing-library/jest-dom";

import server from "./src/app/mocks/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
