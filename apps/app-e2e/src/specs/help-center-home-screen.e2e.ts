/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  goToHelpCenter,
  verifyHelpHomeScreenCoreElements,
} from "../helpers/help-center.helper"

describe("Help Center - Home Screen", () => {
  before(async () => {
    await goToHelpCenter()
  })

  verifyHelpHomeScreenCoreElements()
})
