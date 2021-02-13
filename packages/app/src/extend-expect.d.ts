// tslint:disable:no-namespace
declare namespace jest {
  interface Matchers<R> {
    toHaveStyleRule: import("node_modules/jest-styled-components/typings/index.d.ts").jest.Matchers["toHaveStyleRule"]
    toBeTranslationKey(): CustomMatcherResult
  }
}
