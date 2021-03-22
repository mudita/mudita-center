module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    "(.*)svg.component": "<rootDir>/__mocks__/file-mock.js",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/jest/mocks/file-mock.js",
    "Components/(.*)": "<rootDir>/src/components/$1",
    "Theme/(.*)": "<rootDir>/src/theme/$1",
    "Utils/(.*)": "<rootDir>/src/utils/$1",
    "Storybook/(.*)": "<rootDir>/.storybook/$1",
  },
  rootDir: "./",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", ".cache", "public", "cypress"],
  globals: {
    __PATH_PREFIX__: "",
  },
  testURL: "http://localhost",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx,js,jsx}",
    "!src/components/storybook/**/*",
    "!src/components/**/*.stories.{ts,tsx,js,jsx}",
  ],
  coverageReporters: ["lcov", "text-summary", "json-summary"],
  coverageDirectory: "coverage",
}
