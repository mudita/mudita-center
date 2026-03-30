/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getService } from "./src/helpers/api-device-test-service"

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

jest.setTimeout(30_000)

beforeAll(async () => {
  await getService().init()
}, 60_000)

afterAll(async () => {
  await getService().reset()
}, 60_000)
