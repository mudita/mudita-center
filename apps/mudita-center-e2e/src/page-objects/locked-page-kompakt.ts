/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

export class LockedPageKompakt extends Page {
  public get passcodeModal() {
    return $('//div[@data-testid="modal-content-device-initialization"]')
  }

  public get passcodeModalHeader() {
    return $('//div[@data-testid="modal-content-device-initialization"]//h1')
  }

  public get passcodeModalSubtext() {
    return $('//div[@data-testid="modal-content-device-initialization"]//p')
  }
}

export default new LockedPageKompakt()
