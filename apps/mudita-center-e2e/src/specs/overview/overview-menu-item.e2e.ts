import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"

describe("Overview Menu Item", () => {
  before(async () => {
    await browser.waitUntil(() => E2EMockClient.checkConnection())

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })
    await browser.pause(6000)
  })
  it("Overview menu item is displayed", async () => {
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await expect(menuItem).toBeDisplayed()
  })
  it("Overview menu item is displayed second", async () => {
    E2EMockClient.addDevice({
      path: "path-2",
      serialNumber: "new-serial-number",
    })
    await browser.pause(60000)

    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await expect(menuItem).toBeDisplayed()
  })
})
