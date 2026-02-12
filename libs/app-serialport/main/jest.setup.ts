/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

jest.mock("app-utils/main", () => ({}))

jest.mock("p-queue", () => {
  return {
    __esModule: true,
    default: class {
      start = jest.fn()
      add = jest.fn()
      pause = jest.fn()
      clear = jest.fn()
    },
    TimeoutError: class extends Error {},
  }
})

jest.mock("app-localize/utils", () => ({
  __esModule: true,
}))

jest.mock("electron-log", () => ({
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
  silly: jest.fn(),
}))
