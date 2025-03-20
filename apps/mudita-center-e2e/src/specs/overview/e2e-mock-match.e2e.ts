import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  apiConfigWithContacts,
  contactsConfig,
  contactsData,
  menuWithContacts,
} from "../../../../../libs/e2e-mock/responses/src"

describe("E2E mock match sample", () => {
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

  it.only("Connect device with two different responses for one endpoint", async () => {
    // if body of FEATURE_CONFIGURATION request is equal to { feature: "contacts", lang: "en-US" } then return body: contactsConfig.
    // in other cases return response without match filed
    E2EMockClient.mockResponse({
      path: "path-1",
      body: contactsConfig,
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      status: 200,
      match: {
        expected: { feature: "mc-contacts", lang: "en-US" },
      },
    })
    // if body of FEATURE_DATA request is equal to { feature: "contacts", lang: "en-US" } then return body: contactsConfig.
    // in other cases return response without match filed
    E2EMockClient.mockResponse({
      path: "path-1",
      body: contactsData,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
      match: {
        expected: { feature: "mc-contacts", lang: "en-US" },
      },
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: apiConfigWithContacts,
      endpoint: "API_CONFIGURATION",
      method: "GET",
      status: 200,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: menuWithContacts,
      endpoint: "MENU_CONFIGURATION",
      method: "GET",
      status: 200,
    })

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })
    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/contacts"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()

    await browser.pause(10000)
  })
})
