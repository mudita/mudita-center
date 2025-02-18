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
    return $('//p[@data-testid="ui-typography-p1-emptyStateDetailText"]')
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

  public get contactsTableCell() {
    return $('//*[@data-testid="ui-table-cell"]')
  }

  public get allContactsTableRows() {
    return $$('//*[@data-testid="ui-table-row"]')
  }

  public get contactsCheckboxesLabels() {
    return $$('//label[contains(@for, "checkbox-")]')
  }

  public get contactSelectedBar() {
    return $('//*[@data-testid="ui-typography-p4-selectedContactsCounter"]')
  }

  public get contactSelectedDeleteButton() {
    return $('//*[@data-testid="button-text_deleteButton"]')
  }

  public get contactDetailsDeleteButton() {
    return $('//*[@data-testid="icon-delete"]')
  }

  public get contactDeleteModal() {
    return $('//*[@data-testid="modal-content-detailsDeleteModal"]')
  }

  public get contactDeleteModalFromList() {
    return $('//*[@data-testid="modal-content-globalDeleteModal"]')
  }

  public get contactDeleteModalIcon() {
    return $('//*[@data-testid="icon-exclamation"]')
  }
  public get contactDeleteModalTitle() {
    return $('//h1[text()="Delete contact?"]')
  }

  public get contactDeleteModalText() {
    return $(
      '//p[@data-testid="ui-typography-p1-globalDeleteModalContent" and text()="This can\'t be undone so please make a copy of any important information first."]'
    )
  }

  public get contactDeleteDetailsModalText() {
    return $(
      '//p[@data-testid="ui-typography-p1-detailsDeleteModalContent" and text()="This can\'t be undone so please make a copy of any important information first."]'
    )
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

  public get deleteContactConfirmButtonFromList() {
    return $(
      '//*[@data-testid="primary-button-globalDeleteModalConfirmButton"]'
    )
  }
  public get deleteContactCancelButtonFromList() {
    return $('//*[@data-testid="primary-button-globalDeleteModalCancelButton"]')
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
        }]//td[2]//p[@data-testid="ui-typography-p1-contactDisplayName"]`
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
