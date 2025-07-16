/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import AppInitPage from "../page-objects/app-init.page"
import { NewsPaths } from "../all-paths"
import { SPEC_TITLE } from "../consts/spec-title"

describe(SPEC_TITLE.WELCOME_SCREEN, () => {
  it("is visible after app start", async () => {
    const layout = await AppInitPage.fullscreenLayout
    await layout.waitForExist()
    await expect(layout).toBeDisplayed()
  })

  it("has main close button", async () => {
    const closeButton = await AppInitPage.fullscreenLayoutCloseButton
    await expect(closeButton).toBeDisplayed()
    await expect(closeButton).toBeClickable()
  })

  it("closes the screen when layout close button is clicked and goes to the news page", async () => {
    const closeButton = await AppInitPage.fullscreenLayoutCloseButton
    await closeButton.click()

    const url = await AppInitPage.getPageUrl()
    await expect(url).toBe(NewsPaths.Index)
  })
})
