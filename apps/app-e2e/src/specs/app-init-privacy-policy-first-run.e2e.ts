/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SPEC_TITLE } from "../consts/spec-title"
import PrivacyPolicyPage from "../page-objects/privacy-policy.page"

describe(SPEC_TITLE.APP_INIT_PRIVACY_POLICY_FIRST_RUN, () => {
  it("should display all core modal elements", async () => {
    const {
      privacyPolicyModal,
      privacyPolicyModalTitle,
      privacyPolicyModalTitleIcon,
      privacyPolicyModalDescription,
    } = PrivacyPolicyPage
    await expect(privacyPolicyModal).toBeDisplayed()
    await expect(privacyPolicyModalTitle).toBeDisplayed()
    await expect(privacyPolicyModalTitle).toHaveText("Privacy Policy")
    await expect(privacyPolicyModalTitleIcon).toBeDisplayed()
    await expect(privacyPolicyModalDescription).toBeDisplayed()
    await expect(privacyPolicyModalDescription).toHaveText(
      "Please read and agree to the Privacy policy to be able to use Mudita Center."
    )
  })

  it("should display action controls", async () => {
    const {
      privacyPolicyModalAcceptButton,
      privacyPolicyModalCloseButton,
      privacyPolicyModalButtonLink,
    } = PrivacyPolicyPage
    await expect(privacyPolicyModalCloseButton).toBeDisplayed()
    await expect(privacyPolicyModalCloseButton).toBeClickable()
    await expect(privacyPolicyModalButtonLink).toBeDisplayed()
    await expect(privacyPolicyModalButtonLink).toHaveText(
      "READ THE PRIVACY POLICY"
    )
    await expect(privacyPolicyModalButtonLink).toBeClickable()
    await expect(privacyPolicyModalAcceptButton).toBeDisplayed()
    await expect(privacyPolicyModalAcceptButton).toHaveText("AGREE")
    await expect(privacyPolicyModalAcceptButton).toBeClickable()
  })
})
