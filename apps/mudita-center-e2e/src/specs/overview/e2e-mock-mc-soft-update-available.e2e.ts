import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import ModalAppUpdatePage from "../../page-objects/modal-app-update.page"
import ModalAppUpdateLaterPage from "../../page-objects/modal-app-update-later.page"
import ModalPage from "../../page-objects/modal.page"
import packageInfo from "../../../../mudita-center/package.json"
import { sleep } from "../../helpers/sleep.helper"
import HomePage from "../../page-objects/home.page"
import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"

describe("Soft Update MC - Successful Download", () => {
  const newestAvailableVersion = "9.9.9"

  before(async function () {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })

    E2EMockClient.setMockUpdateState({
      available: true,
      version: newestAvailableVersion,
    })

    E2EMockClient.mockHttpResponse({
      url: "v2-app-configuration",
      method: "GET",
      status: 200,
      data: {
        centerVersion: "0.0.1",
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

    const modalHeader = await ModalAppUpdatePage.modalHeader
    await expect(modalHeader).toBeDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center")

    const paragraphAvailableVersion =
      await ModalAppUpdatePage.paragraphAvailableVersion
    await expect(paragraphAvailableVersion).toBeDisplayed()
    await expect(paragraphAvailableVersion).toHaveTextContaining(
      "Update Mudita Center to"
    )
    const textParagraphAvailableVersion =
      await paragraphAvailableVersion.getText()
    const availableAppVersion = textParagraphAvailableVersion.split("to ").pop()
    console.log("AVAILABLE VERSION:" + availableAppVersion)
    await expect(availableAppVersion).toBe(newestAvailableVersion)

    const paragraphCurrentVersion =
      await ModalAppUpdatePage.paragraphCurrentVersion
    await expect(paragraphCurrentVersion).toBeDisplayed()
    await expect(paragraphCurrentVersion).toHaveTextContaining(
      "Update it to use the full version of the Mudita Center. Your current version:"
    )
    const textParagraphCurrentVersion = await paragraphCurrentVersion.getText()
    const currentAppVersion = textParagraphCurrentVersion.split(": ").pop()
    console.log("CURRENT VERSION:" + currentAppVersion)

    // Privacy policy
    const paragraphPrivacyPolicy =
      await ModalAppUpdatePage.paragraphPrivacyPolicy
    await expect(paragraphPrivacyPolicy).toBeDisplayed()
    await expect(paragraphPrivacyPolicy).toHaveText(
      "Please accept the Privacy Policy to start updating Mudita Center."
    )

    const linkPrivacyPolicy = await ModalAppUpdatePage.linkPrivacyPolicy
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

    const checkboxPrivacyPolicy = await ModalAppUpdatePage.checkboxPrivacyPolicy
    await expect(checkboxPrivacyPolicy).toBeDisplayed()
    await expect(checkboxPrivacyPolicy).not.toBeChecked()

    const buttonUpdate = await ModalAppUpdatePage.buttonUpdate
    await expect(buttonUpdate.isDisplayed())
    await expect(buttonUpdate).not.toBeClickable()

    const modalCloseButton = await ModalPage.modalCloseButton
    await expect(modalCloseButton).toBeDisplayed()
    await modalCloseButton.click()
  })
  it("Check update later modal", async () => {
    const modalHeader = await ModalAppUpdateLaterPage.modalHeader
    await expect(modalHeader).toBeDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center")
    const paragraphAvailableVersion =
      await ModalAppUpdateLaterPage.paragraphAvailableVersion
    await expect(paragraphAvailableVersion).toBeDisplayed()
    await expect(paragraphAvailableVersion).toHaveTextContaining(
      "Update Mudita Center to"
    )
    const paragraphUpdateLaterPrivacyPolicy =
      await ModalAppUpdateLaterPage.paragraphUpdateLaterPrivacyPolicy
    await expect(paragraphUpdateLaterPrivacyPolicy).toBeDisplayed()
    await expect(paragraphUpdateLaterPrivacyPolicy).toHaveTextContaining(
      "To be able to fully use the application, please agree to the Privacy Policy and update Mudita Center."
    )

    const buttonUpdateLater = await ModalAppUpdateLaterPage.buttonUpdateLater
    await expect(buttonUpdateLater).toBeDisplayed()
    await expect(buttonUpdateLater).toHaveText("UPDATE LATER")
    await expect(buttonUpdateLater).toBeClickable()

    const modalCloseButton = await ModalAppUpdateLaterPage.modalCloseButton
    await expect(modalCloseButton).toBeDisplayed()
    await modalCloseButton.click()

    const homeHeader = await HomePage.homeHeader
    await expect(homeHeader).toBeDisplayed()
    await expect(homeHeader).toHaveText("Welcome to Mudita Center")
    const notNowButton = await HomePage.notNowButton
    await expect(notNowButton).toBeDisplayed()
    await notNowButton.click()
  })
  it("Go back to Soft Update Modal.", async () => {
    const settingsTab = await NavigationTabs.settingsTab
    await settingsTab.waitForDisplayed()
    await settingsTab.click()

    const aboutTab = await SettingsPage.aboutTab
    await aboutTab.waitForDisplayed()
    await aboutTab.click()

    const aboutCheckForUpdatesButton =
      await SettingsPage.aboutCheckForUpdatesButton
    await aboutCheckForUpdatesButton.waitForDisplayed()
    await aboutCheckForUpdatesButton.click()
  })

  it("Button UPDATE is clickable after selecting the checkbox", async () => {
    const checkboxPrivacyPolicy = await ModalAppUpdatePage.checkboxPrivacyPolicy
    await expect(checkboxPrivacyPolicy).toBeDisplayed()

    const buttonUpdate = await ModalAppUpdatePage.buttonUpdate
    await expect(buttonUpdate).toBeDisplayed()
    await expect(buttonUpdate).not.toBeClickable()

    await checkboxPrivacyPolicy.click()
    await expect(checkboxPrivacyPolicy).toBeChecked()

    await expect(buttonUpdate).toBeClickable()
  })

  it("Soft Update the app", async () => {
    const buttonUpdate = await ModalAppUpdatePage.buttonUpdate
    await expect(buttonUpdate).toBeDisplayed()
    await buttonUpdate.click()

    const modalHeader = await ModalAppUpdatePage.modalHeader
    await expect(modalHeader).toBeDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center")

    const paragraphUpdatingMuditaCenter =
      await ModalAppUpdatePage.paragraphUpdatingMuditaCenter
    await expect(paragraphUpdatingMuditaCenter).toBeDisplayed()
    await expect(paragraphUpdatingMuditaCenter).toHaveText(
      "Updating Mudita Center"
    )

    const spinnerLoader = await ModalAppUpdatePage.spinnerLoader
    await expect(spinnerLoader).toBeDisplayed()
    const spinnerColor = await spinnerLoader.getCSSProperty("color")
    await expect(spinnerColor.value).toBe("rgba(109,155,188,1)")

    const spinnerAnimation = await spinnerLoader.getCSSProperty("animation")
    await expect(spinnerAnimation.value).toBe(
      "chase 2.5s linear 0s infinite normal both running"
    )

    const paragraphPleaseWait = await ModalAppUpdatePage.paragraphPleaseWait
    await expect(paragraphPleaseWait).toBeDisplayed()
    await expect(paragraphPleaseWait).toHaveText(
      "Please wait while Mudita Center is being updated."
    )
  })
})
