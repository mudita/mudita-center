/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal from "../helpers/modal"
import { ModalTestId } from "../all-test-ids"
import Page from "./page"

class PrivacyPolicyPage extends Page {
  private _privacyPolicyModal = new Modal("general.privacyPolicyModal.title")

  public get privacyPolicyModal() {
    return this._privacyPolicyModal.modal
  }

  public get privacyPolicyModalTitle() {
    return this._privacyPolicyModal.title
  }

  public get privacyPolicyModalTitleIcon() {
    return this._privacyPolicyModal.titleIcon
  }

  public get privacyPolicyModalCloseButton() {
    return this._privacyPolicyModal.closeButton
  }

  public get privacyPolicyModalDescription() {
    return this.privacyPolicyModal.$(`.//p`)
  }

  public get privacyPolicyModalButtonLink() {
    return this.privacyPolicyModal.$(`.//p/following-sibling::a[1]`)
  }

  public get privacyPolicyModalAcceptButton() {
    return this.privacyPolicyModal.$(
      `.//div[@data-testid="${ModalTestId.Buttons}"]/button[1]`
    )
  }
}

export default new PrivacyPolicyPage()
