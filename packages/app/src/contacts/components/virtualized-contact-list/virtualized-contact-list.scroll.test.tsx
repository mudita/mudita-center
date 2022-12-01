/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VirtualizedContactList } from "App/contacts/components/virtualized-contact-list/virtualized-contact-list.component"
import { VirtualizedContactListProps } from "App/contacts/components/virtualized-contact-list/virtualized-contact-list.interface"
import { Contact } from "App/contacts/dto"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { Component } from "react"
import * as ReactVirtuosoModule from "react-virtuoso"

class MockedClassComponent extends Component {
  render() {
    return <div>Hello</div>
  }
}

jest.mock("react-virtuoso", () => {
  const { VirtuosoMockContext } =
    jest.requireActual<typeof ReactVirtuosoModule>("react-virtuoso")

  const MockedGroupedVirtuoso = () => {
    return <MockedClassComponent />
  }
  return { GroupedVirtuoso: MockedGroupedVirtuoso, VirtuosoMockContext }
})

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

const contact2: Contact = {
  id: "2",
  firstName: "Adam",
  lastName: "Baczek",
  primaryPhoneNumber: "234",
  secondaryPhoneNumber: "",
  email: "example123@mudita.com",
  note: "abc",
  ice: true,
  favourite: false,
  blocked: false,
  firstAddressLine: "Nowacka 3, Warszawa",
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
  return renderWithThemeAndIntl(<VirtualizedContactList {...props} />)
}

describe("scroll to view", () => {
  let scrollSpy: jest.SpyInstance

  beforeEach(() => {
    scrollSpy = jest.fn()

    jest.spyOn(React, "useRef").mockImplementation(() => ({
      current: { scrollToIndex: scrollSpy },
    }))
  })

  test("tries to scroll to particular contact when is equal to the selected one", () => {
    renderer({
      componentContactList: [
        {
          category: "B",
          contacts: [contact, contact2],
        },
      ],
      selectedContact: contact2,
    })

    expect(scrollSpy).toHaveBeenCalledTimes(1)
    expect(scrollSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        index: 1,
      })
    )
  })

  test("does not scroll when contact is not selected", () => {
    renderer({
      componentContactList: [
        {
          category: "B",
          contacts: [contact, contact2],
        },
      ],
      selectedContact: null,
    })

    expect(scrollSpy).not.toHaveBeenCalled()
  })
})
