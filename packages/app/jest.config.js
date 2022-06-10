const { coverageThreshold } = require("./jest.coverage.json")

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    "(.*)svg.component": "<rootDir>/__mocks__/file-mock.js",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js",
    "App/(.*)": "<rootDir>/src/$1",
    "Cypress/(.*)": "cypress/$1",
    "Storybook/(.*)": ".storybook/$1",
  },
  rootDir: "./",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", ".cache", "public", "cypress"],
  globals: {
    __PATH_PREFIX__: "",
  },
  testURL: "http://localhost",
  setupFiles: ["<rootDir>/test-envs.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  roots: ["<rootDir>/src"],
  testResultsProcessor: "./jest.processor.js",
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{js,ts,tsx}",
    "!src/__deprecated__/**",
    "!src/__mocks__/**",
    "!src/**/*.stories.{js,ts,tsx}",
    "!src/**/*.container.{js,ts,tsx}",
    "!src/**/*.constant.{js,ts,tsx}",
    "!src/**/*.error.{js,ts,tsx}",
    "!src/**/*.model.{js,ts,tsx}",
    "!src/**/*.request.{js,ts,tsx}",
    "!src/**/*.module.{js,ts,tsx}",
    "!src/**/*.styled.{js,ts,tsx}",
    "!src/**/*.interface.{js,ts,tsx}",
    "!src/**/*.type.{js,ts,tsx}",
    "!src/**/*.index.{js,ts,tsx}",
    "!src/**/*.d.ts",
  ],
  coverageReporters: ["lcov", "text-summary", "json-summary"],
  coverageDirectory: "coverage",
  coverageThreshold,
}
