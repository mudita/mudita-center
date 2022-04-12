/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import {
  AnalyticDataTrackerOptions,
  AnalyticDataTrackerService,
} from "App/analytic-data-tracker/services/analytic-data-tracker.service"

const apiUrl = ""
const analyticDataTrackerOptions: AnalyticDataTrackerOptions = {
  _id: "",
  apiUrl: "",
  siteId: 0,
}

const defaultParams = {
  _id: analyticDataTrackerOptions._id,
  idsite: analyticDataTrackerOptions.siteId,
  apiv: 1,
  rec: 1
}

const axiosInstance = axios.create()

const createMockAdapter = (): MockAdapter => {
  return new MockAdapter(axiosInstance)
}

let axiosMock: MockAdapter = createMockAdapter()

beforeEach(() => {
  axiosMock = createMockAdapter()
})

describe("`AnalyticDataTrackerService`", () => {
  describe("`track` method", () => {
    test("when the request is successful and tracking is enabled `track` method return status 200", async () => {
      const subject = new AnalyticDataTrackerService(
        { ...analyticDataTrackerOptions, trackingEnabled: true },
        axiosInstance
      )
      axiosMock.onPost(apiUrl).replyOnce(200)
      const response = await subject.track({})

      expect(response?.status).toEqual(200)
    })

    test("when tracking is disabled `track` method return undefined", async () => {
      const subject = new AnalyticDataTrackerService(
        { ...analyticDataTrackerOptions, trackingEnabled: false },
        axiosInstance
      )

      const response = await subject.track({})

      expect(response).toEqual(undefined)
    })
  })

  describe("`toggleTracking` method", () => {
    test("`toggleTracking` successfully set `trackingEnabled` flag to `true`", async () => {
      const subject = new AnalyticDataTrackerService(
        { ...analyticDataTrackerOptions, trackingEnabled: false },
        axiosInstance
      )
      axiosMock.onPost(apiUrl).reply(200)
      const response = await subject.track({})
      expect(response).toEqual(undefined)

      subject.toggleTracking(true)
      const response2 = await subject.track({})
      expect(response2).not.toEqual(undefined)
    })

    test("`toggleTracking` successfully set `trackingEnabled` flag to `false`", async () => {
      const subject = new AnalyticDataTrackerService(
        { ...analyticDataTrackerOptions, trackingEnabled: true },
        axiosInstance
      )
      axiosMock.onPost(apiUrl).reply(200)
      const response = await subject.track({})
      expect(response).not.toEqual(undefined)

      subject.toggleTracking(false)
      const response2 = await subject.track({})
      expect(response2).toEqual(undefined)
    })
  })

  describe("`setVisitorMetadata` method", () => {
    test("`setVisitorMetadata` successfully set `visitorMetadata` field", async () => {
      const subject = new AnalyticDataTrackerService(
        { ...analyticDataTrackerOptions, trackingEnabled: true },
        axiosInstance
      )
      axiosMock.onPost(apiUrl).reply(200)

      const response = await subject.track({})
      expect(response?.config.params).toEqual(defaultParams)

      subject.setVisitorMetadata({lang: "pl"})
      const response2 = await subject.track({})

      expect(response2?.config.params).toEqual({...defaultParams, "lang": "pl"})
    })
  })
})
