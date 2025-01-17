/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ContactsKompaktPage extends Page {
  public get iconContactsBook() {
    return $(`//*[@data-testid="icon-contacts-book"]`)
  }

  public get importContactsSubtext() {
    return $('//p[@data-testid="ui-typography-p1"]')
  }

  public get importContactsButton() {
    return $('//*[@data-testid="primary-button-importContactsButton"]')
  }

  public get addContactButton() {
    return $('//*[@data-testid="primary-button-createContactsButton"]')
  }

  public get contactsCounter() {
    return $('//h4[@data-testid="location"]')
  }
  public get contactsSearchField() {
    return $('//input[@type="search"]')
  }

  public get contactsTableRow() {
    return $('//*[@data-testid="ui-table-cell"]')
  }

  public get allContactsTableRows() {
    return $$('//*[@data-testid="ui-table-row"]')
  }

  public get contactDetailsDeleteButton() {
    return $('//*[@data-testid="icon-delete"]')
  }

  public get contactDeleteModal() {
    return $('//*[@data-testid="modal-content-detailsDeleteModal"]')
  }

  public get deleteContactConfirmButton() {
    return $(
      '//*[@data-testid="primary-button-detailsDeleteModalConfirmButton"]'
    )
  }
  public get deleteContactCancelButton() {
    return $(
      '//*[@data-testid="primary-button-detailsDeleteModalCancelButton"]'
    )
  }
  public get checkboxByRowIndex() {
    return (rowIndex: number) =>
      $(
        `(//*[@data-testid="ui-table-row"])[${
          rowIndex + 1
        }]//td[1]//input[@type="checkbox"]`
      )
  }

  public get displayNameByRowIndex() {
    return (rowIndex: number) =>
      $(
        `(//*[@data-testid="ui-table-row"])[${
          rowIndex + 1
        }]//td[2]//p[@data-testid="ui-typography-p1"]`
      )
  }

  public get emptyCellByRowIndex() {
    return (rowIndex: number) =>
      $(`(//*[@data-testid="ui-table-row"])[${rowIndex + 1}]//td[3]`)
  }

  public get phoneNumberByRowIndex() {
    return (rowIndex: number) =>
      $(`(//*[@data-testid="ui-table-row"])[${rowIndex + 1}]//td[4]`)
  }

  public get phoneNumberCounterByRowIndex() {
    return (rowIndex: number) =>
      $(`(//*[@data-testid="ui-table-row"])[${rowIndex + 1}]//td[5]`)
  }
}
export default new ContactsKompaktPage()
