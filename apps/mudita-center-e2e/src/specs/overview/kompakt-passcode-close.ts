import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { passcodeLockedKompakt } from "../../../../../libs/e2e-mock/responses/src"
import { overviewDataWithOneSimCard2nd } from "../../../../../libs/e2e-mock/responses/src"
import LockedPageKompakt from "../../page-objects/locked-page-kompakt"
import NewsPage from "../../page-objects/news.page"

describe("Kompakt passcode close", () => {
  const firstSerialNumber = "KOM1234567890"
  const secondSerialNumber = "KOM1234567891"

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

  it("Connect locked device and check welcome screen", async () => {
    E2EMockClient.mockResponses([
      {
        path: "path-1",
        body: passcodeLockedKompakt,
        endpoint: "MENU_CONFIGURATION", //needed for testing locked status
        method: "GET",
        status: 423, //needed for testing locked status
      },
    ])
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: firstSerialNumber,
    })

    await browser.pause(6000)
  })

  it("Check passcode locked modal", async () => {
    const passcodeModal = LockedPageKompakt.passcodeModal
    await expect(passcodeModal).toBeDisplayed()
    const passcodeModalHeader = LockedPageKompakt.passcodeModalHeader
    await expect(passcodeModalHeader).toHaveText("Unlock your phone")
    const passcodeModalSubtext = LockedPageKompakt.passcodeModalSubtext
    await expect(passcodeModalSubtext).toHaveText(
      "Enter your passcode or scan your fingerprint"
    )
  })

  it("Close passcode locked modal", async () => {
    const closePasscodeModalButton = LockedPageKompakt.closePasscodeModalButton
    await closePasscodeModalButton.click()
  })

  it("Check if passcode locked modal is gone", async () => {
    const passcodeModal = LockedPageKompakt.passcodeModal
    await expect(passcodeModal).not.toBeDisplayed()
  })

  it("Check if News page is opened", async () => {
    const newsHeader = await NewsPage.newsHeader
    await expect(newsHeader).toHaveText("Mudita News")
  })

  it("Connect 2nd locked device", async () => {
    E2EMockClient.mockResponses([
      {
        path: "path-2",
        body: overviewDataWithOneSimCard2nd,
        endpoint: "MENU_CONFIGURATION",
        method: "GET",
        status: 423,
      },
    ])
    E2EMockClient.addDevice({
      path: "path-2",
      serialNumber: secondSerialNumber,
    })

    await browser.pause(3000)
  })
  it("Disconnect the devices and check if News page is still present", async () => {
    E2EMockClient.removeDevice("path-1")
    E2EMockClient.removeDevice("path-2")

    const newsHeader = await NewsPage.newsHeader
    await expect(newsHeader).toHaveText("Mudita News")
  })
})
