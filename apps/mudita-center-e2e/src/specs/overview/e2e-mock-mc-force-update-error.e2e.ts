import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import ModalPage from "../../page-objects/modal.page"
import modalAppUpdatePage from "../../page-objects/modal-app-update.page"
import modalAppUpdateErrorPage from "../../page-objects/modal-app-update-error.page"
import packageInfo from "../../../../mudita-center/package.json"

describe("Force Update MC - Unsuccessful Download", () => {
  const newestAvailableVersion = "9.9.9"

  before(async function () {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })

    E2EMockClient.setMockUpdateState({
      available: true,
      downloaded: false,
      version: newestAvailableVersion,
    })

    E2EMockClient.mockHttpResponse({
      url: "v2-app-configuration",
      method: "GET",
      status: 200,
      data: {
        centerVersion: "999.0.0",
        productVersions: {
          MuditaHarmony: "1.0.0",
          MuditaPure: "1.0.0",
          APIDevice: "1.0.0",
        },
      },
    })
  })

  it("Check update modal sections ", async () => {
    console.log("PACKAGE INFO VERSION:" + packageInfo.version)

    // Header
    const modalHeader = await modalAppUpdatePage.modalHeader
    await expect(modalHeader).toBeDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center")

    // Available version
    const paragraphAvailableVersion =
      await modalAppUpdatePage.paragraphAvailableVersion
    await expect(paragraphAvailableVersion).toBeDisplayed()
    await expect(paragraphAvailableVersion).toHaveTextContaining(
      "Update Mudita Center to"
    )
    const textParagraphAvailableVersion =
      await paragraphAvailableVersion.getText()
    const availableAppVersion = textParagraphAvailableVersion.split("to ").pop()
    console.log("AVAILABLE VERSION:" + availableAppVersion)
    await expect(availableAppVersion).toBe(newestAvailableVersion)

    // Current version
    const paragraphCurrentVersion =
      await modalAppUpdatePage.paragraphCurrentVersion
    await expect(paragraphCurrentVersion).toBeDisplayed()
    await expect(paragraphCurrentVersion).toHaveTextContaining(
      "Update it to use the full version of the Mudita Center. Your current version:"
    )
    const textParagraphCurrentVersion = await paragraphCurrentVersion.getText()
    const currentAppVersion = textParagraphCurrentVersion.split(": ").pop()
    console.log("CURRENT VERSION:" + currentAppVersion)

    // Privacy policy
    const paragraphPrivacyPolicy =
      await modalAppUpdatePage.paragraphPrivacyPolicy
    await expect(paragraphPrivacyPolicy).toBeDisplayed()
    await expect(paragraphPrivacyPolicy).toHaveText(
      "Please accept the Privacy Policy to start updating Mudita Center."
    )

    const linkPrivacyPolicy = await modalAppUpdatePage.linkPrivacyPolicy
    await expect(linkPrivacyPolicy).toBeDisplayed()
    await expect(linkPrivacyPolicy).toHaveText("Privacy Policy")

    const linkColor = await linkPrivacyPolicy.getCSSProperty("color")
    await expect(linkColor.value).toBe("rgba(109,155,188,1)")
    const linkDecoration = await linkPrivacyPolicy.getCSSProperty(
      "text-decoration"
    )
    await expect(linkDecoration.value).toBe(
      "underline solid rgb(109, 155, 188)"
    )

    const checkboxPrivacyPolicy = await modalAppUpdatePage.checkboxPrivacyPolicy
    await expect(checkboxPrivacyPolicy).toBeDisplayed()
    await expect(checkboxPrivacyPolicy).not.toBeChecked()

    // Button: UPDATE
    const buttonUpdate = await modalAppUpdatePage.buttonUpdate
    await expect(buttonUpdate.isDisplayed())
    await expect(buttonUpdate).not.toBeClickable()

    // Close modal button
    const modalCloseButton = await ModalPage.modalCloseButton
    await expect(modalCloseButton).not.toBeDisplayed()
  })

  it("Button UPDATE is clickable after selecting the checkbox", async () => {
    const checkboxPrivacyPolicy = await modalAppUpdatePage.checkboxPrivacyPolicy
    await expect(checkboxPrivacyPolicy).toBeDisplayed()

    const buttonUpdate = await modalAppUpdatePage.buttonUpdate
    await expect(buttonUpdate).toBeDisplayed()
    await expect(buttonUpdate).not.toBeClickable()

    await checkboxPrivacyPolicy.click()
    await expect(checkboxPrivacyPolicy).toBeChecked()

    await expect(buttonUpdate).toBeClickable()
  })

  it("Check Error modal", async () => {
    const buttonUpdate = await modalAppUpdatePage.buttonUpdate
    await expect(buttonUpdate).toBeDisplayed()
    await buttonUpdate.click()

    const modalHeader = await modalAppUpdatePage.modalHeader
    await expect(modalHeader).toBeDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center")

    const infoIcon = await modalAppUpdateErrorPage.infoIcon
    await expect(infoIcon).toBeDisplayed()
    const infoIconSize = await infoIcon.getSize()
    await expect(infoIconSize.width).toBe(48)
    await expect(infoIconSize.height).toBe(48)

    const errorLabel = await modalAppUpdateErrorPage.errorLabel
    await expect(errorLabel).toBeDisplayed()
    await expect(errorLabel).toHaveText("Error")

    const paragraphPleaseRestart =
      await modalAppUpdateErrorPage.pleaseRestartParagraph
    await expect(paragraphPleaseRestart).toBeDisplayed()
    await expect(paragraphPleaseRestart).toHaveText(
      "Please restart the app or update it manually."
    )

    const buttonClose = await modalAppUpdateErrorPage.closeButton
    await expect(buttonClose).toBeDisplayed()
    await expect(buttonClose).toHaveText("CLOSE")
  })
})
