/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  itBehavesLikeAboutTabBeforeManualCheck,
  itBehavesLikeCheckingModal,
  itBehavesLikeUpdateErrorModal,
  simulateMcUpdateCheckFromAbout,
} from "../helpers/about-mc-update.helper"

describe("About MC Update Checking Failed", () => {
  before(async () => {
    await simulateMcUpdateCheckFromAbout({ check: { error: true } })
  })

  itBehavesLikeAboutTabBeforeManualCheck()
  itBehavesLikeCheckingModal()
  itBehavesLikeUpdateErrorModal()
})
