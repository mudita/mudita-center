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

jest.mock("App/main/utils/logger")
jest.mock("axios")

jest.spyOn(axios, "create")
jest.spyOn(logger, "info")

const noValidSiteId: AnalyticDataTrackerFactoryOption["siteId"] = NaN
const noValidApiUrl: AnalyticDataTrackerFactoryOption["apiUrl"] = ""

afterEach(() => {
  jest.clearAllMocks()
})

describe("`AnalyticDataTrackerFactory`", () => {
  test("`logger.info` is called when `siteId` isn't valid", () => {
    AnalyticDataTrackerFactory.create({
      siteId: noValidSiteId,
      apiUrl: "http://",
    })
    expect(logger.info).toBeCalled()
    expect(axios.create).not.toHaveBeenCalled()
  })

  test("`logger.info` is called when `apiUrl` isn't valid", () => {
    AnalyticDataTrackerFactory.create({ siteId: 1, apiUrl: noValidApiUrl })
    expect(logger.info).toBeCalled()
    expect(axios.create).not.toHaveBeenCalled()
  })

  test("`logger.info` isn't called when passed arguments are valid", () => {
    AnalyticDataTrackerFactory.create({ siteId: 1, apiUrl: "http://" })
    expect(logger.info).not.toBeCalled()
    expect(axios.create).toHaveBeenCalled()
  })
})
