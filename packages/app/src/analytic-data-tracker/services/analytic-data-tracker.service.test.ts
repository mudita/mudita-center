/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { AnalyticDataTrackerService } from "App/analytic-data-tracker/services/analytic-data-tracker.service"

const apiUrl = ""
const axiosInstance = axios.create()

const createMockAdapter = (): MockAdapter => {
  return new MockAdapter(axiosInstance)
}

let axiosMock: MockAdapter = createMockAdapter()

beforeEach(() => {
  axiosMock = createMockAdapter()
})

describe("`AnalyticDataTrackerService`", () => {
  test("when the request is successful `track` method return status 200", async () => {
    const subject = new AnalyticDataTrackerService(0, apiUrl, axiosInstance)
    axiosMock.onPost(apiUrl).replyOnce(200)
    const response = await subject.track({})

    expect(response.status).toEqual(200)
  })
})
