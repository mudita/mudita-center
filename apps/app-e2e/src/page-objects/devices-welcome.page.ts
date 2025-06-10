/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { WelcomeScreenTestIds } from "../all-test-ids"

class DevicesWelcomePage extends Page {
  public get welcomeScreen() {
    return this.fullscreenLayout.$(
      `.//div[@data-testid="${WelcomeScreenTestIds.WelcomeScreen}"]`
    )
  }

  public get welcomeScreenTitle() {
    return this.welcomeScreen.$(`.//h1`)
  }

  public get welcomeScreenSubtitle() {
    return this.welcomeScreen.$(`.//p`)
  }

  public get welcomeScreenDevicesList() {
    return this.welcomeScreen.$(`.//ul`)
  }

  public get welcomeScreenCancelButton() {
    return this.welcomeScreen.$(`.//button[1]`)
  }

  public get welcomeScreenTroubleshootingButton() {
    return this.welcomeScreen.$(`.//button[2]`)
  }
}

export default new DevicesWelcomePage()
