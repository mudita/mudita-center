/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "App/__deprecated__/main/utils/logger"
import {
  AnalyticDataTrackerFactory,
  AnalyticDataTrackerFactoryOption,
} from "App/analytic-data-tracker/services/analytic-data-tracker.factory"
import axios from "axios"
import { getSettingsService } from "App/settings/containers"
import { SettingsService } from "App/settings/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

jest.mock("App/settings/containers/settings.container")
jest.mock("App/__deprecated__/main/utils/logger")
jest.mock("axios")

jest.spyOn(axios, "create")
jest.spyOn(logger, "info")

const noValidSiteId: AnalyticDataTrackerFactoryOption["siteId"] = NaN
const noValidApiUrl: AnalyticDataTrackerFactoryOption["apiUrl"] = ""
const settingsService = {
  getSettings: jest.fn().mockReturnValue({ applicationId: "" }),
} as unknown as SettingsService
const fileSystem = {} as unknown as FileSystemService

afterEach(() => {
  jest.clearAllMocks()
})

describe("`AnalyticDataTrackerFactory`", () => {
  describe("when `getSettingsService` return service", () => {
    test("`logger.info` is called when `siteId` isn't valid", () => {
      ;(getSettingsService as jest.Mock).mockReturnValue(settingsService)
      AnalyticDataTrackerFactory.create(fileSystem, {
        siteId: noValidSiteId,
        apiUrl: "http://",
      })
      expect(logger.info).toBeCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(axios.create).not.toHaveBeenCalled()
    })

    test("`logger.info` is called when `apiUrl` isn't valid", () => {
      ;(getSettingsService as jest.Mock).mockReturnValue(settingsService)
      AnalyticDataTrackerFactory.create(fileSystem, {
        siteId: 1,
        apiUrl: noValidApiUrl,
      })
      expect(logger.info).toBeCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(axios.create).not.toHaveBeenCalled()
    })

    test("`logger.info` isn't called when passed arguments are valid", () => {
      ;(getSettingsService as jest.Mock).mockReturnValue(settingsService)
      AnalyticDataTrackerFactory.create(fileSystem, {
        siteId: 1,
        apiUrl: "http://",
      })
      expect(logger.info).not.toBeCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(axios.create).toHaveBeenCalled()
    })
  })

  describe("when `getAppSettingsService` no return service", () => {
    test("`create` method throw error", () => {
      ;(getSettingsService as jest.Mock).mockReturnValue(undefined)
      expect(() =>
        AnalyticDataTrackerFactory.create(fileSystem, {
          siteId: 1,
          apiUrl: "http://",
        })
      ).toThrow()
    })
  })
})
