/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

// tslint:disable:no-namespace
declare namespace jest {
  interface Matchers<R> {
    toHaveStyleRule: import("node_modules/jest-styled-components/typings/index.d.ts").jest.Matchers["toHaveStyleRule"]
    toBeTranslationKey(): CustomMatcherResult
  }
}
