module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  rootDir: "./",
  roots: ["<rootDir>/__tests__"],
  setupFilesAfterEnv: ["jest-extended"],
}
