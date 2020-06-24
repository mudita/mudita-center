const { coverageThreshold } = require("./jest.coverage.json")

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    "(.*)svg.component": "<rootDir>/__mocks__/file-mock.js",
    "react-syntax-highlighter/dist/esm/languages/prism/jsx":
      "<rootDir>/__mocks__/file-mock.js",
    "react-syntax-highlighter/dist/esm/styles/prism/prism":
      "<rootDir>/__mocks__/file-mock.js",
    "react-syntax-highlighter": "<rootDir>/__mocks__/syntax-highlighter.js",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js",
    "Renderer/(.*)": "<rootDir>/src/renderer/$1",
    "App/(.*)": "<rootDir>/src/$1",
    "Cypress/(.*)": "cypress/$1",
    "Storybook/(.*)": ".storybook/$1",
    "Backend/(.*)": "<rootDir>/src/backend/$1",
    "Common/(.*)": "<rootDir>/src/common/$1",
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
  collectCoverageFrom: ["src/**/*.{js,ts,tsx}"],
  coverageReporters: ["lcov", "text-summary", "json-summary"],
  coverageDirectory: "coverage",
  coverageThreshold,
}
