/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactImportRowTestIds } from "App/contacts/components/contact-import-row/contact-import-row-test-ids.enum"
import { ContactImportRow } from "App/contacts/components/contact-import-row/contact-import-row.component"
import { ContactImportRowProperties } from "App/contacts/components/contact-import-row/contact-import-row.interface"
import { ModalType } from "App/contacts/components/contact-import/contact-import-modal.enum"
import { NewContact } from "App/contacts/reducers"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const contactData: NewContact = {
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "666",
  secondaryPhoneNumber: "777",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: false,
  firstAddressLine: "Baker street 221, London",
  secondAddressLine: "",
}

const renderer = (extraProps?: Partial<ContactImportRowProperties>) => {
  const props: ContactImportRowProperties = {
    data: contactData,
    getRowStatus: jest
      .fn()
      .mockResolvedValue({ selected: true, indeterminate: true }),
    modalType: ModalType.Select,
    toggleRow: jest.fn(),
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ContactImportRow {...props} />)
}

describe("when row is rendered in failed mode", () => {
  test("checkbox is rendered", () => {
    const { queryByTestId } = renderer({ modalType: ModalType.Fail })

    expect(
      queryByTestId(ContactImportRowTestIds.RowCheckbox)
    ).toBeInTheDocument()
  })
  test("failed icon is rendered", () => {
    const { queryByTestId } = renderer({ modalType: ModalType.Fail })

    expect(
      queryByTestId(ContactImportRowTestIds.FailedIcon)
    ).toBeInTheDocument()
  })
})

describe("when row is rendered in select mode", () => {
  test("checkbox is rendered", () => {
    const { queryByTestId } = renderer({ modalType: ModalType.Select })

    expect(
      queryByTestId(ContactImportRowTestIds.RowCheckbox)
    ).toBeInTheDocument()
  })
  test("failed icon is not rendered", () => {
    const { queryByTestId } = renderer({ modalType: ModalType.Select })

    expect(
      queryByTestId(ContactImportRowTestIds.FailedIcon)
    ).not.toBeInTheDocument()
  })
})

describe("when row is rendered in success mode", () => {
  test("checkbox is not rendered", () => {
    const { queryByTestId } = renderer({ modalType: ModalType.Success })

    expect(
      queryByTestId(ContactImportRowTestIds.RowCheckbox)
    ).not.toBeInTheDocument()
  })
  test("failed icon is not rendered", () => {
    const { queryByTestId } = renderer({ modalType: ModalType.Success })

    expect(
      queryByTestId(ContactImportRowTestIds.FailedIcon)
    ).not.toBeInTheDocument()
  })
})

test("user full name is displayed, starting from last name", () => {
  const { queryByText } = renderer()
  expect(queryByText("Doe John")).toBeInTheDocument()
})

test("both user phone numbers are displayed when defined", () => {
  const { queryByText } = renderer()
  expect(queryByText("666, 777")).toBeInTheDocument()
})

test.each([
  {
    primaryPhoneNumber: "666",
    secondaryPhoneNumber: undefined,
  },
  {
    primaryPhoneNumber: undefined,
    secondaryPhoneNumber: "666",
  },
])(
  "single number is displayed when the other is not defined",
  (phoneNumbersData) => {
    const { queryByText } = renderer({
      data: {
        ...contactData,
        ...phoneNumbersData,
      },
    })
    expect(queryByText("666")).toBeInTheDocument()
  }
)
