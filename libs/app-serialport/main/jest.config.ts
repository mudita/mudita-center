module.exports = {
  displayName: "app-serialport-main",
  preset: "../../../jest.preset.js",
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nx/react/plugins/jest",
    "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@nx/react/babel"] }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(p-queue|p-timeout|eventemitter3)/)",
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../../coverage/libs/app-serialport/main",
}
