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
}
export default new BrowseContactsModal()
