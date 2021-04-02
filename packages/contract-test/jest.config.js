module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  rootDir: "./",
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["jest-extended"],
}
