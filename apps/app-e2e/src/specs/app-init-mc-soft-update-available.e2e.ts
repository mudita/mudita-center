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
import { SPEC_TITLE } from "../consts/spec-title"

describe(SPEC_TITLE.APP_INIT_MC_SOFT_UPDATE_AVAILABLE, () => {
  before(async () => {
    const version = "5.0.0"
    McUpdatePage.setUpdateAvailableModal({ version })
    await simulateAppInitUpdateStep({ version, forced: false })
  })

  itBehavesLikeAvailableModal({ closeVisible: true })
  itBehavesLikeUpdateInProgressModal()
})
