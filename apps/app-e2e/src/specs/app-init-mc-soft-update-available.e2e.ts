/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import McUpdatePage from "../page-objects/mc-update.page"
import {
  simulateAppInitUpdateStep,
  itBehavesLikeAvailableModal,
  itBehavesLikeUpdateInProgressModal,
} from "../helpers/mc-update.helper"

describe("App Init Step - MC Soft Update Available", () => {
  before(async () => {
    const version = "5.0.0"
    McUpdatePage.setUpdateAvailableModal({ version })
    await simulateAppInitUpdateStep({ check: { version, forced: false } })
  })

  itBehavesLikeAvailableModal({ closeVisible: true })
  itBehavesLikeUpdateInProgressModal()
})
