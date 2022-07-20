/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactImportModal, {
  ModalType,
} from "App/contacts/components/contact-import/contact-import-modal.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { ContactImportModalTestIds } from "App/contacts/components/contact-import/contact-import-modal-test-ids.enum"

const contacts = [
  {
    id: "0",
    firstName: "John",
    lastName: "Doe",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Baker street 221, London",
    secondAddressLine: "",
  },
  {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  {
    id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "3284 Klocko Plains",
    secondAddressLine: "",
  },
  {
    id: "a664baed-09be-4698-b9ea-69849986b055",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "voluptatem expedita vel",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "55727 Kelly Expressway",
    secondAddressLine: "",
  },
  {
    id: "40a66803-5a7a-4ee0-bc46-154412d86532",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+67 558 173 266",
    email: "",
    note: "ipsum numquam fugiat",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Estevanburgh",
  },
  {
    id: "026630e7-31b7-4e49-8590-b527cfb98e31",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+57 523 983 615",
    email: "",
    note: "dolorem",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Lake Lonie",
  },
  {
    id: "7173eddd-a533-4f1d-a09d-f1fec74d29f9",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+85 102 096 521",
    secondaryPhoneNumber: "+04 349 051 883",
    email: "example@mudita.com",
    note: "sequi recusandae eveniet",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "36324 Norval Flat",
    secondAddressLine: "",
  },
]

const renderer = (extraProps?: {}) => {
  return renderWithThemeAndIntl(
    <ContactImportModal
      contacts={contacts}
      onActionButtonClick={noop}
      modalType={ModalType.Select}
      open
      {...extraProps}
    />
  )
}

describe("Action button", () => {
  test("should be initially enable", () => {
    const { getByTestId } = renderer()
    expect(getByTestId(ModalTestIds.ModalActionButton)).toBeEnabled()
  })
  test("should be disable when none of the checkboxes are selected", () => {
    const { getByTestId } = renderer()
    getByTestId(ContactImportModalTestIds.ToggleAllCheckbox).click()
    expect(getByTestId(ModalTestIds.ModalActionButton)).toBeDisabled()
  })

  test("should be called with correct payload", () => {
    const onActionButtonClick = jest.fn()
    const { getByTestId } = renderer({ onActionButtonClick })
    getByTestId(ModalTestIds.ModalActionButton).click()
    expect(onActionButtonClick).toBeCalledWith(contacts)
  })
})

test("Correct amount of rows is rendered", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(ContactImportModalTestIds.ContactRow)).toHaveLength(
    contacts.length
  )
})

test("All checkboxes are initially checked", () => {
  const { container } = renderer()
  const checkboxes = container.querySelectorAll('[type="checkbox"]')
  checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked())
})

test("Toggle all checkbox can uncheck remaining checkboxes", () => {
  const { getByTestId, container } = renderer()
  const toggleAllCheckbox = getByTestId(
    ContactImportModalTestIds.ToggleAllCheckbox
  )
  expect(toggleAllCheckbox).toBeChecked()
  toggleAllCheckbox.click()
  const checkboxes = container.querySelectorAll('[type="checkbox"]')
  checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked())
})

test("Failed rows have a proper icon attached", () => {
  const { getAllByTestId } = renderer({
    modalType: ModalType.Fail,
    successfulItemsCount: 3,
  })
  getAllByTestId(ContactImportModalTestIds.ContactRow).forEach((row, index) => {
    expect(
      row.querySelector('[data-testid="icon-FailRed"]')
    ).toBeInTheDocument()
  })
})

describe("Select text on contact list", () => {
  test("should display all selected number", () => {
    const { getByTestId } = renderer()
    expect(
      getByTestId(ContactImportModalTestIds.SelectedText)
    ).toHaveTextContent("7 [value] module.contacts.importingListSelected")
  })
  test("should display zero selected number", () => {
    const { getByTestId } = renderer()
    const toggleAllCheckbox = getByTestId(
      ContactImportModalTestIds.ToggleAllCheckbox
    )
    toggleAllCheckbox.click()
    expect(
      getByTestId(ContactImportModalTestIds.SelectedText)
    ).toHaveTextContent("0 [value] module.contacts.importingListSelected")
  })
  test("should display selected number", () => {
    const { getByTestId, getAllByTestId } = renderer()
    const allCheckboxes = getAllByTestId(ContactImportModalTestIds.RowCheckbox)
    allCheckboxes[0].click()
    expect(
      getByTestId(ContactImportModalTestIds.SelectedText)
    ).toHaveTextContent("6 [value] module.contacts.importingListSelected")
  })
})
test("Import contact list should be sorted by last name", () => {
  const { getAllByTestId } = renderer()
  expect(
    getAllByTestId(ContactImportModalTestIds.ContactRow)[5]
  ).toHaveTextContent("Borewicz Sławomir")
  expect(
    getAllByTestId(ContactImportModalTestIds.ContactRow)[6]
  ).toHaveTextContent("Doe John")
})
