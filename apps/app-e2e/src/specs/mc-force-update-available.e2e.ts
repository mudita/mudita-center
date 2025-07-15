/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUpdatePage } from "../page-objects/mc-update.page"
import { goToMcUpdate } from "../helpers/mc-update.helper"

let mcUpdatePage: McUpdatePage

describe("MC Force Update Available - App Init Step", () => {
  before(async () => {
    const version = "5.0.0"
    mcUpdatePage = new McUpdatePage({ version })
    await goToMcUpdate({ version, forced: true })
  })

  it("should display the contact support modal", async () => {
    await expect(mcUpdatePage.updateAvailableModal).toBeDisplayed()
  })

  it("should not display the modal close button", async () => {
    await expect(mcUpdatePage.updateAvailableCloseButton).not.toBeDisplayed()
  })
})
