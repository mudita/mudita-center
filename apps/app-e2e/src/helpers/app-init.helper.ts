/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import AppInitPage from "../page-objects/app-init.page"
import { Suite } from "@wdio/types/build/Frameworks"

export const passAppInit = async (suite: Suite) => {
  if (
    [
      "Soft Update Available - App Init Step",
      "Force Update Available - App Init Step",
      "Update Available Checking Failed - App Init Step",
    ].includes(suite.title)
  ) {
    return
  }

  if (!["Privacy Policy modal"].includes(suite.title)) {
    await AppInitPage.acceptPrivacyPolicy()
  }

  if (
    ![
      "Privacy Policy modal",
      "Welcome screen",
      "Devices - welcome screen",
    ].includes(suite.title)
  ) {
    await AppInitPage.closeFullscreenLayout()
  }
}
