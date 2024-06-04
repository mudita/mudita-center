/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getHttpClientService } from "shared/http-client"
import { Configuration } from "Core/settings/dto"
import { ConfigurationService } from "Core/settings/services/configuration.service"

const previousEnvironment = { ...process.env }
const httpClientService = getHttpClientService()

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
    APIDevice: "3.3.3",
  },
}
const defaultConfig = {
  centerVersion: "1.0.0-default",
  productVersions: {
    MuditaHarmony: "1.1.1-default",
    MuditaPure: "2.2.2-default",
  },
}

jest.mock(
  "Core/settings/static/default-app-configuration.json",
  () => defaultConfig
)

describe("When API return success status code", () => {
  test("returns API response", async () => {
    jest
      .spyOn(httpClientService, "get")
      .mockReturnValueOnce(
        Promise.resolve({ status: 200, data: configuration })
      )

    const subject = new ConfigurationService(httpClientService)
    const result = await subject.getConfiguration()
    expect(result).toEqual(configuration)
  })
})

describe("When API return failed status code", () => {
  test("returns default configuration value", async () => {
    jest.spyOn(httpClientService, "get").mockReturnValueOnce(
      Promise.resolve({
        status: 500,
        data: {
          error: "Luke, I'm your error",
        },
      })
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const appConfiguration = require("../static/app-configuration.json")
    const subject = new ConfigurationService(httpClientService)
    const result = await subject.getConfiguration()
    if (appConfiguration) {
      expect(result).toEqual(appConfiguration)
    } else {
      expect(result).toEqual(defaultConfig)
    }
  })
})
