import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../../libs/e2e-mock/responses/src"
import LockedPageKompakt from "../../page-objects/locked-page-kompakt"

describe("Kompakt passcode close", () => {
  const firstSerialNumber = "KOM1234567890"

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

  it("Connect device and check welcome screen", async () => {
    E2EMockClient.mockResponses([
      {
        path: "path-1",
        body: overviewDataWithOneSimCard,
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      },
    ])
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: firstSerialNumber,
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Check passcode locked modal", async () => {
    const passcodeModal = LockedPageKompakt.passcodeModal
    await expect(passcodeModal).toBeDisplayed()
    const passcodeModalHeader = LockedPageKompakt.passcodeModalHeader
    await expect(passcodeModalHeader).toHaveText("Unlock your phone")
    const passcodeModalSubtext = LockedPageKompakt.passcodeModalHeader
    await expect(passcodeModalSubtext).toHaveText(
      "Enter your passcode or scan your fingerprint"
    )
  })
})
