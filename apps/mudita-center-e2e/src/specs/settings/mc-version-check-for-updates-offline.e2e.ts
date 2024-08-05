/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import ModalPage from "../../page-objects/modal.page"
import McUpdateModalPage from "../../page-objects/mc-update-modal.page"
import HomePage from "../../page-objects/home.page"
import testsHelper from "../../helpers/tests.helper"
import dns from "node:dns"
import screenshotHelper from "../../helpers/screenshot.helper"
import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"

describe("Checking for Mudita Center updates", () => {
  before(async function () {
    if (testsHelper.isLinux()) {
      this.skip()
    }

    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })

    // Clear browser cache
    await browser.deleteAllCookies()
    await browser.execute("window.localStorage.clear();")
    await browser.execute("window.sessionStorage.clear();")

    // Switch to offline mode before starting the tests
    await browser.setNetworkConditions({
      offline: true,
      latency: 0,
      download_throughput: 0,
      upload_throughput: 0,
    })

    // Add a small delay to ensure network conditions are applied
    await browser.pause(1000)

    // Verify network conditions
    const isOnline = await testsHelper.isOnline()
    await expect(isOnline).toBeFalsy()

    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Open Settings -> About", async () => {
    const settingsTab = await NavigationTabs.settingsTab
    await settingsTab.waitForDisplayed()
    await settingsTab.click()

    const aboutTab = await SettingsPage.aboutTab
    await aboutTab.waitForDisplayed()
    await aboutTab.click()
  })

  it("Check 'Check for updates' button", async () => {
    const aboutCheckForUpdatesButton =
      await SettingsPage.aboutCheckForUpdatesButton
    await aboutCheckForUpdatesButton.waitForDisplayed()
    await expect(aboutCheckForUpdatesButton).toHaveTextContaining(
      "CHECK FOR UPDATES"
    )
    await aboutCheckForUpdatesButton.click()

    const modalHeader = await ModalPage.modalHeader
    await expect(modalHeader).toBeDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center")
  })

  it("Check for updates", async () => {
    const checkingFailedUpdateSubtitle =
      await McUpdateModalPage.checkingFailedUpdateSubtitle
    await expect(checkingFailedUpdateSubtitle).toBeDisplayed()
    await expect(checkingFailedUpdateSubtitle).toHaveText("Checking failed")

    const checkingFailedUpdateBody =
      await McUpdateModalPage.checkingFailedUpdateBody
    await expect(checkingFailedUpdateBody).toBeDisplayed()
    await expect(checkingFailedUpdateBody).toHaveText(
      "Opps, something went wrong. \nPlease check your internet connection"
    )

    await ModalPage.closeModalButtonClick()
  })
  it("Check Settings -> About checking failed label", async () => {
    screenshotHelper.makeViewScreenshot()
    const aboutCheckForUpdateFailedLabel =
      await SettingsPage.aboutCheckForUpdateFailedLabel

    await expect(aboutCheckForUpdateFailedLabel).toBeDisplayed()

    await expect(aboutCheckForUpdateFailedLabel).toHaveText(
      "Checking for updates failed"
    )
  })

  after(async () => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()

    // Switch back to online mode after finishing the tests
    await browser.setNetworkConditions({
      offline: false,
      latency: 0,
      download_throughput: -1,
      upload_throughput: -1,
    })

    // Add a small delay to ensure network conditions are applied
    await browser.pause(1000)

    // Verify network conditions
    const isOnline = await testsHelper.isOnline()
    await expect(isOnline).toBeTruthy()
  })
})
