module.exports = {
  extends: "@mudita/eslint-config",
  parserOptions: {
    project: "./tsconfig.json",
  },
  root: true,
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars-experimental": "error",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
      },
    ],
  },
}
