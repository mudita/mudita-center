module.exports = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/jest/mocks/file-mock.js",
    ".+\\.(svg)$": "<rootDir>/config/jest/mocks/svg-mock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx,js,jsx}",
    "!src/components/storybook/**/*",
    "!src/components/**/*.stories.{ts,tsx,js,jsx}",
  ],
  coverageReporters: ["lcov", "text-summary", "json-summary"],
  coverageDirectory: "coverage",
  preset: "ts-jest",
}
