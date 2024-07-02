/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// tslint:disable:no-namespace
declare namespace jest {
  interface Matchers<R> {
    toHaveStyleRule: import("node_modules/jest-styled-components/typings/index.d.ts").jest.Matchers["toHaveStyleRule"]
    toBeTranslationKey(): CustomMatcherResult
  }
}

declare module "brie" {
  interface Criteria {
    always: boolean
  }

  interface SetupArgs {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    features: Record<string, { criteria: Criteria[] }>
  }

  interface SetupReturns {
    get(key: string): boolean
    getAll(): Record<string, boolean>
  }

  export function setup(args: SetupArgs): SetupReturns
}

declare module "sqlite-parser"
