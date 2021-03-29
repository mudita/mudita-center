module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  rootDir: "./",
  roots: ["<rootDir>/src/__tests__"],
  setupFilesAfterEnv: ["jest-extended"],
}
