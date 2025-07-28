/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import AppInitPage from "../page-objects/app-init.page"
import { SPEC_TITLE } from "../consts/spec-title"
import { Suite } from "@wdio/types/build/Frameworks"

export const passAppInit = async (suite: Suite) => {
  if (suite.title.startsWith("App Init")) {
    return
  }

  await AppInitPage.acceptPrivacyPolicy()

  if (
    ![SPEC_TITLE.WELCOME_SCREEN, SPEC_TITLE.DEVICES_WELCOME_SCREEN].includes(
      suite.title
    )
  ) {
    await AppInitPage.closeFullscreenLayout()
  }
}
