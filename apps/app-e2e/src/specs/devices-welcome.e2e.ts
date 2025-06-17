/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DevicesInitPage from "../page-objects/devices-welcome.page"
import { NewsPaths } from "../all-paths"

describe("Devices - welcome screen", () => {
  it("is visible after app start", async () => {
    const layout = await DevicesInitPage.welcomeScreen
    await layout.waitForExist()
    await expect(layout).toBeDisplayed()
  })

  it("has correct title", async () => {
    const title = await DevicesInitPage.welcomeScreenTitle
    await expect(title).toHaveText("Welcome to Mudita Center")
  })

  it("has correct subtitle", async () => {
    const subtitle = await DevicesInitPage.welcomeScreenSubtitle
    await expect(subtitle).toHaveText("Connect your device to the computer.")
  })

  it("has correct devices list", async () => {
    const list = await DevicesInitPage.welcomeScreenDevicesList
    await expect(list).toHaveText("Kompakt\nHarmony 1\nHarmony 2\nPure")
  })

  it("has cancel button", async () => {
    const button = await DevicesInitPage.welcomeScreenCancelButton
    await expect(button).toHaveText("NOT NOW")
    await expect(button).toBeClickable()
  })

  it("has troubleshooting button", async () => {
    const button = await DevicesInitPage.welcomeScreenTroubleshootingButton
    await expect(button).toHaveText(
      "MY DEVICE DOESN’T SHOW UP AFTER CONNECTING"
    )
    await expect(button).toBeClickable()
  })

  it("closes the screen when cancel button is clicked and goes to the news page", async () => {
    const cancelButton = await DevicesInitPage.welcomeScreenCancelButton
    await cancelButton.waitForClickable()
    await cancelButton.click()

    const url = await DevicesInitPage.getPageUrl()
    await expect(url).toBe(NewsPaths.Index)
  })
})
