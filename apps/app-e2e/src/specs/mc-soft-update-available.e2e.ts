/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUpdatePage } from "../page-objects/mc-update.page"
import { goToMcUpdate } from "../helpers/mc-update.helper"

let mcUpdatePage: McUpdatePage

describe("MC Soft Update Available - App Init Step", () => {
  before(async () => {
    const version = "5.0.0"
    mcUpdatePage = new McUpdatePage({ version })
    await goToMcUpdate({ version, forced: false })
  })
  // --- Modal visibility ---
  it("should display the contact support modal", async () => {
    await expect(mcUpdatePage.updateAvailableModal).toBeDisplayed()
  })

  it("should display the modal title", async () => {
    await expect(mcUpdatePage.updateAvailableModalTitle).toBeDisplayed()
  })

  it("should display the modal title icon", async () => {
    await expect(mcUpdatePage.updateAvailableTitleIcon).toBeDisplayed()
  })

  it("should display the modal close button", async () => {
    await expect(mcUpdatePage.updateAvailableCloseButton).toBeDisplayed()
  })

  it("should display the modal description", async () => {
    await expect(mcUpdatePage.updateAvailableModalDescription).toBeDisplayed()
  })

  it("should display the update button", async () => {
    await expect(mcUpdatePage.updateAvailableModalButton).toBeDisplayed()
  })

  it("should display the Privacy Policy link", async () => {
    await expect(
      mcUpdatePage.updateAvailableModalPrivacyPolicyLink
    ).toBeDisplayed()
  })
})
