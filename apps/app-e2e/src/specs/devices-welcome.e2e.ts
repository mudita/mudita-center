/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DevicesInitPage from "../page-objects/devices-welcome.page"
import { NewsPaths } from "../all-paths"
import { SPEC_TITLE } from "../consts/spec-title"

describe(SPEC_TITLE.DEVICES_WELCOME_SCREEN, () => {
  it("should appear after app start", async () => {
    const layout = await DevicesInitPage.welcomeScreen
    await layout.waitForExist()
    await expect(layout).toBeDisplayed()
  })

  it("should display the correct title", async () => {
    const title = await DevicesInitPage.welcomeScreenTitle
    await expect(title).toHaveText("Welcome to Mudita Center")
  })

  it("should display the correct subtitle", async () => {
    const subtitle = await DevicesInitPage.welcomeScreenSubtitle
    await expect(subtitle).toHaveText("Connect your device to the computer.")
  })

  it("should list available devices correctly", async () => {
    const list = await DevicesInitPage.welcomeScreenDevicesList
    await expect(list).toHaveText("Kompakt\nHarmony 1\nHarmony 2")
  })

  it("should have a Cancel button", async () => {
    const button = await DevicesInitPage.welcomeScreenCancelButton
    await expect(button).toHaveText("NOT NOW")
    await expect(button).toBeClickable()
  })

  it("should have a Troubleshooting button", async () => {
    const button = await DevicesInitPage.welcomeScreenTroubleshootingButton
    await expect(button).toHaveText(
      "MY DEVICE DOESN’T SHOW UP AFTER CONNECTING"
    )
    await expect(button).toBeClickable()
  })

  it("should close and navigate to the News page when Cancel is clicked", async () => {
    const cancelButton = await DevicesInitPage.welcomeScreenCancelButton
    await cancelButton.waitForClickable()
    await cancelButton.click()

    const url = await DevicesInitPage.getPageUrl()
    await expect(url).toBe(NewsPaths.Index)
  })
})
