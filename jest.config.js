module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  collectCoverageFrom: [
    "<rootDir>/src/app/*.ts",
    "<rootDir>/src/app/**/*.ts",
    "!<rootDir>/src/app/**/index.ts",
    "!<rootDir>/src/app/**/*.module.ts",
    "<rootDir>/src/app/**/app-routing.module.ts",
    "!<rootDir>/src/app/components/map/map.component.ts",
  ],

  coverageDirectory: "coverage",

  coverageReporters: ["lcov", "text-summary"],

  testPathIgnorePatterns: [
    "<rootDir>/coverage/",
    "<rootDir>/dist/",
    "<rootDir>/e2e/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/app/*.(js|scss)",
  ],

  testMatch: ["<rootDir>/src/app/*.spec.ts", "<rootDir>/src/app/**/*.spec.ts"],

  resolver: "jest-ts-webcompat-resolver",
};
