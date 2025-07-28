/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { simulateMcUpdateCheckFromAbout } from "../helpers/about-mc-update.helper"
import McUpdatePage from "../page-objects/mc-update.page"
import AboutPage from "../page-objects/about.page"

describe("About MC Update Not Available After Manual Check", () => {
  before(async () => {
    await simulateMcUpdateCheckFromAbout(null)
  })

  it("should display default label before checking", async () => {
    await expect(AboutPage.updateLabel).toBeDisplayed()
    await expect(AboutPage.updateLabel).toHaveText("You’re up to date.")
  })

  it("should trigger update check", async () => {
    await AboutPage.updateButton.click()
  })

  it("should display the checking modal with all elements", async () => {
    await expect(McUpdatePage.updateCheckingModalTitle).toBeDisplayed()
    await expect(McUpdatePage.updateCheckingModalTitleIcon).toBeDisplayed()
    await expect(McUpdatePage.updateCheckingModalCloseButton).toBeDisplayed()
    await expect(McUpdatePage.updateCheckingModalDescription).toBeDisplayed()
  })

  it("should display the 'Update Not Available' modal with all key elements", async () => {
    await expect(McUpdatePage.updateNotAvailableModal).toBeDisplayed()
    await expect(McUpdatePage.updateNotAvailableModalTitle).toBeDisplayed()
    await expect(McUpdatePage.updateNotAvailableModalTitleIcon).toBeDisplayed()
    await expect(
      McUpdatePage.updateNotAvailableModalCloseButton
    ).toBeDisplayed()
    await expect(
      McUpdatePage.updateNotAvailableModalDescription
    ).toBeDisplayed()
    await expect(McUpdatePage.updateNotAvailableModalDescription).toHaveText(
      "Your Mudita Center is up to date!"
    )
  })

  it("should display the 'You're up to date.' label in About tab", async () => {
    await McUpdatePage.updateNotAvailableModalCloseButton.click()
    await expect(AboutPage.updateLabel).toBeDisplayed()
    await expect(AboutPage.updateLabel).toHaveText("You’re up to date.")
  })
})
