import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../../libs/e2e-mock/responses/src"
import { createMockBackup } from "./../../helpers/mock-backup"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"

describe("Check restore modal", () => {
  const firstSerialNumber = "0123456789ABCDEF"

  before(async () => {
    await createMockBackup(firstSerialNumber)

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

  it("Connect device", async () => {
    E2EMockClient.mockResponses([
      {
        path: "path-1",
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
        body: {
          ...overviewDataWithOneSimCard,
          sections: {
            ...overviewDataWithOneSimCard.sections,
            backup: {
              ...overviewDataWithOneSimCard.sections.backup,
              show: true,
              details: [
                {
                  fileName: "1752426740400_0123456789ABCDEF.mcbackup",
                  serialNumber: "0123456789ABCDEF",
                  vendorId: "3310",
                  productId: "2006",
                  timestamp: 1752426740400,
                },
              ],
            },
          },
        },
      },
    ])

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "0123456789ABCDEF",
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)
    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
    await browser.pause(7000) //wait until Restore button will appear (it takes about 5-7 seconds to load)
  })

  it("Click Restore button", async () => {
    const kompaktRestoreButton = OverviewKompaktPage.kompaktRestoreButton
    await expect(kompaktRestoreButton).toBeDisplayed()
    await kompaktRestoreButton.click()
  })

  it("Verify Restore modal", async () => {
    const kompaktRestoreModal = OverviewKompaktPage.kompaktRestoreModal
    await expect(kompaktRestoreModal).toBeDisplayed()

    const kompaktRestoreModalIcon = OverviewKompaktPage.kompaktRestoreModalIcon
    await expect(kompaktRestoreModalIcon).toBeDisplayed()

    const kompaktRestoreTitle = OverviewKompaktPage.kompaktRestoreTitle
    await expect(kompaktRestoreTitle).toHaveText("Restore from backup")

    const kompaktRestoreSubtitle = OverviewKompaktPage.kompaktRestoreSubtitle
    await expect(kompaktRestoreSubtitle).toHaveText(
      "Select one of the backups you want to restore."
    )

    const kompaktRestoreModalConfirm =
      OverviewKompaktPage.kompaktRestoreModalConfirm
    await expect(kompaktRestoreModalConfirm).toBeDisplayed()

    const kompaktRestoreModalCancel =
      OverviewKompaktPage.kompaktRestoreModalCancel
    await expect(kompaktRestoreModalCancel).toBeDisplayed()
    await kompaktRestoreModalCancel.click() //close restore modal
  })

  it("Verify if overview page is displayed after closing Restore modal", async () => {
    const kompaktImage = await OverviewKompaktPage.kompaktImage
    await expect(kompaktImage).toBeDisplayed()
  })
})
