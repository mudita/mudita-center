/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

jest.doMock("p-queue", () => {
  return {
    __esModule: true,
    default: class PQueue {
      constructor() {
        return this
      }

      add<T>(fn: () => T | Promise<T>) {
        return Promise.resolve().then(fn)
      }
    },
  }
})

jest.mock("app-localize/utils", () => ({
  __esModule: true,
}))