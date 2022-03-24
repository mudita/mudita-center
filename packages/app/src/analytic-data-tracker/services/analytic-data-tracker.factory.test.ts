/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "App/main/utils/logger"
import {
  AnalyticDataTrackerFactory,
  AnalyticDataTrackerFactoryOption,
} from "App/analytic-data-tracker/services/analytic-data-tracker.factory"
import axios from "axios"
import { getAppSettingsService } from "App/app-settings/containers"
import { AppSettingsService } from "App/app-settings/services"

jest.mock("App/app-settings/containers/app-settings.container")
jest.mock("App/main/utils/logger")
jest.mock("axios")

jest.spyOn(axios, "create")
jest.spyOn(logger, "info")

const noValidApiUrl: AnalyticDataTrackerFactoryOption["apiUrl"] = ""
const appSettingsService = {
  getAppSettings: jest.fn().mockReturnValue({ applicationId: "" }),
} as unknown as AppSettingsService

afterEach(() => {
  jest.clearAllMocks()
})

describe("`AnalyticDataTrackerFactory`", () => {
  describe("when `getAppSettingsService` return service", () => {
    test("`logger.info` is called when `apiUrl` isn't valid", () => {
      ;(getAppSettingsService as jest.Mock).mockReturnValue(appSettingsService)
      AnalyticDataTrackerFactory.create({ apiUrl: noValidApiUrl })
      expect(logger.info).toBeCalled()
      expect(axios.create).not.toHaveBeenCalled()
    })

    test("`logger.info` isn't called when passed arguments are valid", () => {
      ;(getAppSettingsService as jest.Mock).mockReturnValue(appSettingsService)
      AnalyticDataTrackerFactory.create({ apiUrl: "http://" })
      expect(logger.info).not.toBeCalled()
      expect(axios.create).toHaveBeenCalled()
    })
  })

  describe("when `getAppSettingsService` no return service", () => {
    test("`create` method throw error", () => {
      ;(getAppSettingsService as jest.Mock).mockReturnValue(undefined)
      expect(() =>
        AnalyticDataTrackerFactory.create({ apiUrl: "http://" })
      ).toThrow()
    })
  })
})
