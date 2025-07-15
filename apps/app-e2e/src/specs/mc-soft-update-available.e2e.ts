/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUpdatePage } from "../page-objects/mc-update.page"

const mcUpdatePage = new McUpdatePage({ version: "5.0.0" })

describe("MC Soft Update Available - Base Path", () => {
  // --- Modal visibility ---
  it("should display the contact support modal", async () => {
    await expect(mcUpdatePage.updateAvailableModal).toBeDisplayed()
  })

  it("should display the modal title", async () => {
    await expect(mcUpdatePage.updateAvailableModalTitle).toBeDisplayed()
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
