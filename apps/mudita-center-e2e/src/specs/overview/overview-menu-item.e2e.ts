import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"

describe("Overview Menu Item", () => {
  it("Overview menu item is displayed", async () => {
    await browser.waitUntil(() => E2EMockClient.checkConnection())

    E2EMockClient.addDevice({ path: "123123", serialNumber: "asdf" })

    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    expect(menuItem).toBeDisabled()

    // await browser.pause(100000)
  })
})
