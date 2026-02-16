module.exports = {
  displayName: "api-devices-testing",
  preset: "../../jest.preset.js",
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nx/react/plugins/jest",
    "^.+\\.[tj]sx?$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
        ],
        plugins: [
          ["@babel/plugin-transform-private-methods", { loose: true }],
          ["@babel/plugin-transform-class-properties", { loose: true }],
          [
            "@babel/plugin-transform-private-property-in-object",
            { loose: true },
          ],
        ],
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/api-devices-testing",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  maxWorkers: 1,
  transformIgnorePatterns: [
    "/node_modules/(?!p-queue|p-timeout|eventemitter3)",
  ],
  moduleNameMapper: {
    "^\\.\\/providers\\/google$": "<rootDir>/__mocks__/empty-module.js",
    "^\\.\\/providers\\/outlook$": "<rootDir>/__mocks__/empty-module.js",
  },
}
