module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  rootDir: "./",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    webusb: "<rootDir>/__mocks__/webusb.js/",
  },
}
