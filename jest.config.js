module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    "Renderer/(.*)": "<rootDir>/src/renderer/$1",
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
  setupFiles: [],
  roots: ["<rootDir>/src"],
}
