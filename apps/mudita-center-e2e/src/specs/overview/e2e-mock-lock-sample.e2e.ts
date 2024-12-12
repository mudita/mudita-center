import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { DEFAULT_RESPONSES } from "../../../../../libs/e2e-mock/responses/src"
import { mockEntityDownloadProcess } from "../../helpers/mock-entity-download-process.helper"
import {
  audioFileEntities,
  selectedContactsEntities,
} from "../../helpers/entity-fixtures"

function getBodyAsRecord(body: unknown): Record<string, any> {
  return body ? (body as Record<string, any>) : {}
}

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

  it.only("Connect locked device", async () => {
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
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.API_CONFIGURATION?.GET?.[0]?.body
      ),
      endpoint: "API_CONFIGURATION",
      method: "GET",
      status: 200,
    })

    await browser.pause(2000)

    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(DEFAULT_RESPONSES.FEATURE_DATA?.GET?.[0]?.body),
      match: {
        expected: {
          feature: "mc-overview",
          lang: "en-US",
        },
      },
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })

    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(DEFAULT_RESPONSES.FEATURE_DATA?.GET?.[1]?.body),
      match: {
        expected: {
          feature: "fileManager",
          lang: "en-US",
        },
      },
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })

    await browser.pause(2000)

    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.FEATURE_CONFIGURATION?.GET?.[0]?.body
      ),
      match: {
        expected: {
          feature: "contacts",
          lang: "en-US",
        },
      },
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      status: 200,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.FEATURE_CONFIGURATION?.GET?.[1]?.body
      ),
      match: {
        expected: {
          feature: "mc-overview",
          lang: "en-US",
        },
      },
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      status: 200,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.FEATURE_CONFIGURATION?.GET?.[2]?.body
      ),
      match: {
        expected: {
          feature: "fileManager",
          lang: "en-US",
        },
      },
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      status: 200,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.MENU_CONFIGURATION?.GET?.[0]?.body
      ),
      endpoint: "MENU_CONFIGURATION",
      method: "GET",
      status: 200,
    })

    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.ENTITIES_METADATA?.GET?.[0]?.body
      ),
      endpoint: "ENTITIES_METADATA",
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

    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.ENTITIES_CONFIGURATION?.GET?.[0]?.body
      ),
      match: { expected: { entityType: "contacts" } },
      endpoint: "ENTITIES_CONFIGURATION",
      method: "GET",
      status: 200,
    })

    E2EMockClient.mockResponse({
      path: "path-1",
      body: getBodyAsRecord(
        DEFAULT_RESPONSES.ENTITIES_CONFIGURATION?.GET?.[1]?.body
      ),
      match: { expected: { entityType: "audioFiles" } },
      endpoint: "ENTITIES_CONFIGURATION",
      method: "GET",
      status: 200,
    })

    mockEntityDownloadProcess({
      path: "path-1",
      data: selectedContactsEntities,
      entityType: "contacts",
    })
    mockEntityDownloadProcess({
      path: "path-1",
      data: audioFileEntities,
      entityType: "audioFiles",
    })

    await browser.pause(10000)
  })
})
