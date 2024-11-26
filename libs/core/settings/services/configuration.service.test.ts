/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { Configuration } from "Core/settings/dto"
import { ConfigurationService } from "Core/settings/services/configuration.service"

jest.mock("history", () => ({
  createHashHistory: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
    location: { pathname: "", search: "", hash: "", state: null },
  })),
}))

const createMockAdapter = (): MockAdapter => {
  return new MockAdapter(axios)
}

let axiosMock: MockAdapter = createMockAdapter()

const previousEnvironment = { ...process.env }

const configuration: Configuration = {
  centerVersion: "1.0.0",
  productVersions: {
    MuditaHarmony: "1.1.1",
    MuditaHarmonyMsc: "1.1.1",
    MuditaPure: "2.2.2",
    APIDevice: "3.3.3",
  },
}
const defaultConfig = {
  centerVersion: "1.0.0-default",
  productVersions: {
    MuditaHarmony: "1.1.1-default",
    MuditaHarmonyMsc: "1.1.1-default",
    MuditaPure: "2.2.2-default",
  },
}

beforeEach(() => {
  axiosMock = createMockAdapter()
})

beforeAll(() => {
  process.env = {
    ...previousEnvironment,
    MUDITA_CENTER_SERVER_URL: "http://localhost",
  }
})

afterAll(() => {
  process.env = {
    ...previousEnvironment,
  }
})

jest.doMock(
  "Core/settings/static/default-app-configuration.json",
  () => defaultConfig
)

describe("When API return success status code", () => {
  test("returns API response", async () => {
    axiosMock
      .onGet("http://localhost/v2-app-configuration")
      .replyOnce(200, configuration)

    const subject = new ConfigurationService()
    const result = await subject.getConfiguration()
    expect(result).toEqual(configuration)
  })
})

describe("When API return failed status code", () => {
  test("returns default configuration value", async () => {
    axiosMock.onGet("http://localhost/v2-app-configuration").replyOnce(500, {
      error: "Luke, I'm your error",
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const appConfiguration = require("../static/app-configuration.json")
    const subject = new ConfigurationService()
    const result = await subject.getConfiguration()
    if (appConfiguration) {
      expect(result).toEqual(appConfiguration)
    } else {
      expect(result).toEqual(defaultConfig)
    }
  })
})
