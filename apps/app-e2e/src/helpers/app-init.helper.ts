/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import AppInitPage from "../page-objects/app-init.page"
import { SPEC_TITLE } from "../consts/spec-title"
import { Suite } from "@wdio/types/build/Frameworks"

export const passAppInit = async (suite: Suite) => {
  if (
    [
      SPEC_TITLE.APP_INIT_SOFT_UPDATE_AVAILABLE,
      SPEC_TITLE.APP_INIT_FORCE_UPDATE_AVAILABLE,
      SPEC_TITLE.APP_INIT_UPDATE_AVAILABLE_CHECKING_FAILED,
      SPEC_TITLE.APP_INIT_USB_ACCESS_HAPPY_PATH,
      SPEC_TITLE.APP_INIT_USB_ACCESS_CANCEL_PATH,
    ].includes(suite.title)
  ) {
    return
  }

  if (![SPEC_TITLE.PRIVACY_POLICY_MODAL].includes(suite.title)) {
    await AppInitPage.acceptPrivacyPolicy()
  }

  if (
    ![
      SPEC_TITLE.PRIVACY_POLICY_MODAL,
      SPEC_TITLE.WELCOME_SCREEN,
      SPEC_TITLE.DEVICES_WELCOME_SCREEN,
    ].includes(suite.title)
  ) {
    await AppInitPage.closeFullscreenLayout()
  }
}
