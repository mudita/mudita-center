/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal from "../helpers/modal"
import { ModalTestId } from "../all-test-ids"
import Page from "./page"

class AppInitPage extends Page {
  private _privacyPolicyModal = new Modal("general.privacyPolicyModal.title")

  public get privacyPolicyModal() {
    return this._privacyPolicyModal.modal
  }

  public get privacyPolicyButton() {
    return this.privacyPolicyModal.$(`.//p/following-sibling::button[1]`)
  }

  public get privacyPolicyCancelButton() {
    return this._privacyPolicyModal.closeButton
  }

  public get privacyPolicyAcceptButton() {
    return this.privacyPolicyModal.$(
      `.//div[@data-testid="${ModalTestId.Buttons}"]/button[1]`
    )
  }

  public async acceptPrivacyPolicy() {
    await browser.waitUntil(
      async () => {
        return await this.privacyPolicyModal.isDisplayed()
      },
      {
        timeout: 5000,
        timeoutMsg: "Privacy Policy modal did not appear in time",
      }
    )
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
