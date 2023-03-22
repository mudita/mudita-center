/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import ModalPage from "./modal.page"

class BrowseContactsModal extends ModalPage {
  public get emptyContactList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="empty-content"]')
  }
  public get searchInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-input-select-input"]')
  }
  public get modalContactNameText(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $(
      '[data-testid="contact-simple-list-phone-selection-item-avatar-column"]'
    )
  }

  public get modalContactPrimaryNumberText(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $(
      '[data-testid="contact-simple-list-phone-selection-item-primary-phone-field"]'
    )
  }

  public get modalContactSecondaryNumberText(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $(
      '[data-testid="contact-simple-list-phone-selection-item-secondary-phone-field"]'
    )
  }
}
export default new BrowseContactsModal()
