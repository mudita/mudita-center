/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import McUpdatePage from "../page-objects/mc-update.page"
import {
  goToMcUpdate,
  itBehavesLikeAvailableModal,
  itBehavesLikeUpdateInProgressModal,
} from "../helpers/mc-update.helper"

describe("MC Soft Update Available - App Init Step", () => {
  before(async () => {
    const version = "5.0.0"
    McUpdatePage.setUpdateAvailableModal({ version })
    await goToMcUpdate({ version, forced: false })
  })

  itBehavesLikeAvailableModal({ closeVisible: true })
  itBehavesLikeUpdateInProgressModal()
})
