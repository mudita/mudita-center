/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { DEFAULT_RESPONSES } from "../../../../../libs/e2e-mock/responses/src"

describe("E2E mock lock sample", () => {
  before(async () => {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })

  it("Connect locked device", async () => {
    E2EMockClient.mockResponse({
      path: "path-1",
      body: {},
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 423,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: {},
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      status: 423,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: {},
      endpoint: "MENU_CONFIGURATION",
      method: "GET",
      status: 423,
    })

    E2EMockClient.mockResponse({
      path: "path-1",
      body: {},
      endpoint: "OUTBOX",
      method: "GET",
      status: 423,
    })

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    await browser.pause(10000)
    const lockScreen = await $(`//*[text()="Unlock your phone"]`)

    await lockScreen.waitForDisplayed({ timeout: 10000 })
    await expect(lockScreen).toBeDisplayed()
    await browser.pause(2000)

    E2EMockClient.mockResponse({
      path: "path-1",
      body: DEFAULT_RESPONSES.FEATURE_DATA?.GET?.body as Record<
        string,
        unknown
      >,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })

    // await browser.pause(2000)
    E2EMockClient.mockResponse({
      path: "path-1",
      body: DEFAULT_RESPONSES.FEATURE_CONFIGURATION?.GET?.body as Record<
        string,
        unknown
      >,
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      status: 200,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: DEFAULT_RESPONSES.MENU_CONFIGURATION?.GET?.body as Record<
        string,
        unknown
      >,
      endpoint: "MENU_CONFIGURATION",
      method: "GET",
      status: 200,
    })

    E2EMockClient.mockResponse({
      path: "path-1",
      body: {
        features: [],
        data: [],
      },
      endpoint: "OUTBOX",
      method: "GET",
      status: 200,
    })

    await browser.pause(10000)
  })
})
