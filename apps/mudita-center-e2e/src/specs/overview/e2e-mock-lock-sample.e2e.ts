import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { DEFAULT_RESPONSES } from "../../../../../libs/e2e-mock/responses/src"
import { mockEntityDownloadProcess } from "../../helpers/mock-entity-download-process.helper"
import {
  audioFileEntities,
  imageFileEntities,
  ebookFileEntities,
  applicationFileEntities,
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
    E2EMockClient.mockResponses([
      {
        path: "path-1",
        body: {},
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 423,
      },
      {
        path: "path-1",
        body: {},
        endpoint: "FEATURE_CONFIGURATION",
        method: "GET",
        status: 423,
      },
      {
        path: "path-1",
        body: {},
        endpoint: "MENU_CONFIGURATION",
        method: "GET",
        status: 423,
      },
      {
        path: "path-1",
        body: {},
        endpoint: "OUTBOX",
        method: "GET",
        status: 423,
      },
    ])

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    await browser.pause(10000)
    const lockScreen = await $(`//*[text()="Unlock your phone"]`)

    await lockScreen.waitForDisplayed({ timeout: 10000 })
    await expect(lockScreen).toBeDisplayed()
    await browser.pause(2000)

    E2EMockClient.mockResponses([
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.API_CONFIGURATION?.GET?.[0]?.body
        ),
        endpoint: "API_CONFIGURATION",
        method: "GET",
        status: 200,
      },
    ])

    await browser.pause(2000)

    E2EMockClient.mockResponses([
      {
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
      },
      {
        path: "path-1",
        body: getBodyAsRecord(DEFAULT_RESPONSES.FEATURE_DATA?.GET?.[1]?.body),
        match: {
          expected: {
            feature: "mc-file-manager-internal",
            lang: "en-US",
          },
        },
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      },
    ])

    await browser.pause(2000)

    E2EMockClient.mockResponses([
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.FEATURE_CONFIGURATION?.GET?.[0]?.body
        ),
        match: {
          expected: {
            feature: "mc-contacts",
            lang: "en-US",
          },
        },
        endpoint: "FEATURE_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
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
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.FEATURE_CONFIGURATION?.GET?.[2]?.body
        ),
        match: {
          expected: {
            feature: "mc-file-manager-internal",
            lang: "en-US",
          },
        },
        endpoint: "FEATURE_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.MENU_CONFIGURATION?.GET?.[0]?.body
        ),
        endpoint: "MENU_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.ENTITIES_METADATA?.GET?.[0]?.body
        ),
        endpoint: "ENTITIES_METADATA",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: {
          features: [],
          data: [],
        },
        endpoint: "OUTBOX",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.ENTITIES_CONFIGURATION?.GET?.[0]?.body
        ),
        match: { expected: { entityType: "contacts" } },
        endpoint: "ENTITIES_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.ENTITIES_CONFIGURATION?.GET?.[1]?.body
        ),
        match: { expected: { entityType: "audioFiles" } },
        endpoint: "ENTITIES_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.ENTITIES_CONFIGURATION?.GET?.[2]?.body
        ),
        match: { expected: { entityType: "imageFiles" } },
        endpoint: "ENTITIES_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.ENTITIES_CONFIGURATION?.GET?.[3]?.body
        ),
        match: { expected: { entityType: "ebookFiles" } },
        endpoint: "ENTITIES_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: getBodyAsRecord(
          DEFAULT_RESPONSES.ENTITIES_CONFIGURATION?.GET?.[4]?.body
        ),
        match: { expected: { entityType: "applicationFiles" } },
        endpoint: "ENTITIES_CONFIGURATION",
        method: "GET",
        status: 200,
      },
    ])

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

    mockEntityDownloadProcess({
      path: "path-1",
      data: imageFileEntities,
      entityType: "imageFiles",
    })

    mockEntityDownloadProcess({
      path: "path-1",
      data: ebookFileEntities,
      entityType: "ebookFiles",
    })

    mockEntityDownloadProcess({
      path: "path-1",
      data: applicationFileEntities,
      entityType: "applicationFiles",
    })

    await browser.pause(10000)
  })
})
