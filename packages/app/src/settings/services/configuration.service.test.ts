/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { Configuration } from "App/settings/dto"
import { ConfigurationService } from "App/settings/services/configuration.service"

const createMockAdapter = (): MockAdapter => {
  return new MockAdapter(axios)
}

let axiosMock: MockAdapter = createMockAdapter()

const previousEnvironment = { ...process.env }

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

const configuration: Configuration = {
  centerVersion: "1.0.0",
  productVersions: {
    MuditaHarmony: "1.1.1",
    MuditaPure: "2.2.2",
  },
}

jest.mock("App/settings/static/default-app-configuration.json", () => ({
  centerVersion: "1.0.0-default",
  productVersions: {
    MuditaHarmony: "1.1.1-default",
    MuditaPure: "2.2.2-default",
  },
}))

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

    const subject = new ConfigurationService()
    const result = await subject.getConfiguration()
    expect(result).toEqual({
      centerVersion: "1.0.0-default",
      productVersions: {
        MuditaHarmony: "1.1.1-default",
        MuditaPure: "2.2.2-default",
      },
    })
  })
})
