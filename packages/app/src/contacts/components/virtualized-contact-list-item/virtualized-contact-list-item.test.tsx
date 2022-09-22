/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VirtualizedContactListItemTestIds } from "App/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item-test-ids"
import { VirtualizedContactListItem } from "App/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item.component"
import { VirtualizedContactListItemProps } from "App/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item.interface"
import { Contact } from "App/contacts/dto"
import * as DropdownModule from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const contact: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "666",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: true,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const renderer = (extraProps?: Partial<VirtualizedContactListItemProps>) => {
  const props: VirtualizedContactListItemProps = {
    toggleRow: jest.fn(),
    onExport: jest.fn(),
    onEdit: jest.fn(),
    onForward: jest.fn(),
    onBlock: jest.fn(),
    onUnblock: jest.fn(),
    onDelete: jest.fn(),
    onSelect: jest.fn(),
    disableScroll: jest.fn(),
    enableScroll: jest.fn(),
    contact,
    isActive: false,
    editMode: false,
    selectedItems: [],
    ...extraProps,
  }
  return renderWithThemeAndIntl(<VirtualizedContactListItem {...props} />)
}

test("renders full name when contact has it defined", () => {
  const { queryByText } = renderer()

  expect(queryByText("Sławomir Borewicz")).toBeInTheDocument()
})

test("renders unnamed contact label if contact has not defined name", () => {
  const { queryByText } = renderer({
    contact: {
      ...contact,
      firstName: undefined,
      lastName: undefined,
    } as Contact,
  })

  expect(
    queryByText("[value] module.contacts.listUnnamedContact")
  ).toBeInTheDocument()
})

test("renders blocked icon if contact is blocked", () => {
  const { queryByTestId } = renderer({
    contact: {
      ...contact,
      blocked: true,
    },
  })
  expect(
    queryByTestId(VirtualizedContactListItemTestIds.BlockedIcon)
  ).toBeInTheDocument()
})

test("does not render blocked icon if contact is not blocked", () => {
  const { queryByTestId } = renderer({
    contact: {
      ...contact,
      blocked: false,
    },
  })
  expect(
    queryByTestId(VirtualizedContactListItemTestIds.BlockedIcon)
  ).not.toBeInTheDocument()
})

test("renders primary and secondary phone number if defined", () => {
  const { queryByText } = renderer({
    contact: {
      ...contact,
      primaryPhoneNumber: "666",
      secondaryPhoneNumber: "777",
    },
  })

  expect(queryByText("666 777")).toBeInTheDocument()
})

describe("dropdown", () => {
  beforeEach(() => {
    jest
      .spyOn(DropdownModule, "default")
      .mockImplementation((props) => <div {...props}></div>)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("render all action buttons for dropdown", () => {
    const { queryByTestId } = renderer({
      contact,
    })

    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactEditButton)
    ).toBeInTheDocument()
    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactDeleteButton)
    ).toBeInTheDocument()
    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactExportButton)
    ).toBeInTheDocument()
    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactForwardButton)
    ).toBeInTheDocument()
  })

  test("renders unblock button in dropdown if contact is blocked", () => {
    const { queryByTestId } = renderer({
      contact: {
        ...contact,
        blocked: true,
      },
    })
    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactUnblockButton)
    ).toBeInTheDocument()
    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactBlockButton)
    ).not.toBeInTheDocument()
  })
  test("renders block button in dropdown if contact is not blocked", () => {
    const { queryByTestId } = renderer({
      contact: {
        ...contact,
        blocked: false,
      },
    })
    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactUnblockButton)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(VirtualizedContactListItemTestIds.ContactBlockButton)
    ).toBeInTheDocument()
  })
})
