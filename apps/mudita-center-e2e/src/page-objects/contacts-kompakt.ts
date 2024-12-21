/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ContactsKompaktPage extends Page {
  public get contactRow() {
    return $(`//*[@data-testid="ui-table-row"]`)
  }

  public get iconContactsBook() {
    return $(`//*[@data-testid="icon-contacts-book"]`)
  }

  public get importContactsSubtext() {
    return $('//p[@data-testid="ui-typography-p1"]')
  }

  public get importContactsButton() {
    return $('//*[@data-testid="primary-button-importContactsButton"]')
  }
}
export default new ContactsKompaktPage()
