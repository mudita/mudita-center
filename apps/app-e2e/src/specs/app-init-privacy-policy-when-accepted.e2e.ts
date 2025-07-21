/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SPEC_TITLE } from "../consts/spec-title"
import { mockAppSettings } from "../helpers/mock-app-settings"
import PrivacyPolicyPage from "../page-objects/privacy-policy.page"
import AppInitPage from "../page-objects/app-init.page"

describe(SPEC_TITLE.APP_INIT_PRIVACY_POLICY_WHEN_ACCEPTED, () => {
  before(async () => {
    await mockAppSettings({
      user: {
        privacyPolicyAccepted: true,
      },
    })
  })

  it('should not display the privacy policy modal when already accepted', async () => {
    await expect(PrivacyPolicyPage.privacyPolicyModal).not.toBeDisplayed();
  });

  it('should enable the fullscreen when any app init step require', async () => {
    await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable();
  });
})
