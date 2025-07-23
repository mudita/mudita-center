import exp from "constants"
import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../../libs/e2e-mock/responses/src"
import { createMockBackup } from "../../helpers/mock-backup"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"

describe("Check restore - interrupted", () => {
  const firstSerialNumber = "0123456789ABCDEF"

  before(async () => {
    // Arrange – setup backup and connect mock
    await createMockBackup(firstSerialNumber)

    E2EMockClient.connect()
    await browser.waitUntil(() => E2EMockClient.checkConnection())
  })

  after(() => {
    // Clean up
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })

  it("Connect device", async () => {
    // Arrange – setup mocked device response
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
                  serialNumber: firstSerialNumber,
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

    E2EMockClient.addDevice({ path: "path-1", serialNumber: firstSerialNumber })

    // Act – wait for overview menu to load
    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)
    await menuItem.waitForDisplayed({ timeout: 10000 })

    // Assert
    await expect(menuItem).toBeDisplayed()
    await browser.pause(7000)
  })

  it("Click Restore button", async () => {
    // Arrange
    const restoreButton = OverviewKompaktPage.kompaktRestoreButton
    const timeout = 100000
    const interval = 500
    const startTime = Date.now()

    // Act – wait for the button to become clickable
    let isDisplayed = false
    while (Date.now() - startTime < timeout) {
      try {
        isDisplayed = await restoreButton.isDisplayed()
        if (isDisplayed && (await restoreButton.isClickable())) {
          break
        }
      } catch (e) {}
      await browser.pause(interval)
    }

    // Assert
    await expect(restoreButton).toBeDisplayed()
    await restoreButton.click()
  })

  it("Select latest backup file and proceed next", async () => {
    // Arrange
    const label = await OverviewKompaktPage.getLatestBackupLabel()
    const confirmButton = OverviewKompaktPage.kompaktRestoreModalConfirm

    // Act
    await label.click()

    // Assert
    await expect(confirmButton).toBeDisplayed()
    await confirmButton.click()
  })

  it("Verify failed Restore modal", async () => {
    // Arrange
    const failedHeader = OverviewKompaktPage.restoringFailedHeader
    const failedDescription = OverviewKompaktPage.restoringFailedDescription
    const closeButton = OverviewKompaktPage.kompaktRestoreModalCloseFailedButton

    // Act – wait for modal to appear
    await browser.waitUntil(async () => await failedHeader.isDisplayed(), {
      timeout: 15000,
      timeoutMsg: "Restore failed header did not appear",
    })

    // Assert
    await expect(failedHeader).toHaveText("Restore failed")
    await expect(failedDescription).toHaveText(
      "The restore process was interrupted."
    )
    await expect(closeButton).toBeDisplayed()
    await closeButton.click()
  })

  it("Verify if overview page is displayed after Restore is failed", async () => {
    // Arrange
    const kompaktImage = OverviewKompaktPage.kompaktImage

    // Assert
    await expect(kompaktImage).toBeDisplayed()
  })
})
