/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VirtualizedContactList } from "App/contacts/components/virtualized-contact-list/virtualized-contact-list.component"
import { VirtualizedContactListProps } from "App/contacts/components/virtualized-contact-list/virtualized-contact-list.interface"
import { Contact } from "App/contacts/dto"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { VirtuosoMockContext } from "react-virtuoso"

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

const renderer = (extraProps?: Partial<VirtualizedContactListProps>) => {
  const props: VirtualizedContactListProps = {
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
    activeRow: contact,
    componentContactList: [
      {
        category: "B",
        contacts: [contact],
      },
    ],
    selectedContact: contact,
    editMode: false,
    selectedItems: [],
    ...extraProps,
  }

  //https://virtuoso.dev/mocking-in-tests/
  return renderWithThemeAndIntl(<VirtualizedContactList {...props} />, {
    wrapper: ({ children }) => (
      <VirtuosoMockContext.Provider
        value={{ viewportHeight: 300, itemHeight: 100 }}
      >
        {children}
      </VirtuosoMockContext.Provider>
    ),
  })
}

test("renders groups and matching contacts", () => {
  jest.resetAllMocks()

  const { queryByText } = renderer()
  const expectedGroupText = "B"
  const expectedFullName = "Sławomir Borewicz"

  expect(queryByText(expectedGroupText)).toBeInTheDocument()
  expect(queryByText(expectedFullName)).toBeInTheDocument()
})
