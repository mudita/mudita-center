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

  if (
    [
      SPEC_TITLE.ABOUT_MC_SOFT_UPDATE_AVAILABLE_AFTER_APP_INIT_CHECKING_FAILED,
    ].includes(suite.title)
  ) {
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

export const waitForRendererReady = async () => {
  await browser.waitUntil(
    async () => {
      const [readyState, visibility, hasFocus] = await Promise.all([
        browser.execute(() => document.readyState),
        browser.execute(() => (document as Document).visibilityState),
        browser.execute(() => document.hasFocus()),
      ])
      return readyState === "complete" && visibility === "visible" && !!hasFocus
    },
    {
      timeout: 15000,
      interval: 500,
      timeoutMsg: "Renderer not visible/ready in time",
    }
  )
}
