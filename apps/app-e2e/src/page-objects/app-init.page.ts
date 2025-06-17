/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { formatMessage } from "app-localize/utils"
import { ModalTestId } from "../all-test-ids"

class AppInitPage extends Page {
  public get privacyPolicyModal() {
    return $(
      `//div[@data-testid="${ModalTestId.Modal}"][.//h1[@data-testid="${ModalTestId.Title}" and text()="${formatMessage({ id: "general.privacyPolicyModal.title" })}"]]`
    )
  }

  public get privacyPolicyButton() {
    return this.privacyPolicyModal.$(`.//p/following-sibling::button[1]`)
  }

  public get privacyPolicyCancelButton() {
    return this.privacyPolicyModal.$(
      `.//button[@data-testid="${ModalTestId.CloseButton}"]`
    )
  }

  public get privacyPolicyAcceptButton() {
    return this.privacyPolicyModal.$(
      `.//div[@data-testid="${ModalTestId.Buttons}"]/button[1]`
    )
  }

  public async acceptPrivacyPolicy() {
    if (await this.privacyPolicyModal.isDisplayed()) {
      await this.privacyPolicyAcceptButton.click()
      await browser.waitUntil(
        async () => {
          return !(await this.privacyPolicyModal.isDisplayed())
        },
        {
          timeout: 5000,
          timeoutMsg: "Privacy Policy modal did not close in time",
        }
      )
    }
  }
}

export default new AppInitPage()
