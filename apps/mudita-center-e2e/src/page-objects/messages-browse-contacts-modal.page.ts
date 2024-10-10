/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ModalPage from "./modal.page"

class BrowseContactsModal extends ModalPage {
  public get emptyContactList() {
    return $('[data-testid="empty-content"]')
  }
  public get searchInput() {
    return $('[data-testid="contact-input-select-input"]')
  }
  public get modalContactNameText() {
    return $(
      '[data-testid="contact-simple-list-phone-selection-item-avatar-column"]'
    )
  }

  public get modalContactPrimaryNumberText() {
    return $(
      '[data-testid="contact-simple-list-phone-selection-item-primary-phone-field"]'
    )
  }

  public get modalContactSecondaryNumberText() {
    return $(
      '[data-testid="contact-simple-list-phone-selection-item-secondary-phone-field"]'
    )
  }
}
export default new BrowseContactsModal()
