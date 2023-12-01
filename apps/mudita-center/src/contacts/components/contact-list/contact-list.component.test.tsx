/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { waitFor } from "@testing-library/react"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import ContactList from "App/contacts/components/contact-list/contact-list.component"
import { VirtualizedContactListItemTestIds } from "App/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item-test-ids"
import {
  Contact,
  ContactCategory,
  ResultState,
} from "App/contacts/reducers/contacts.interface"
import {
  constructWrapper,
  renderWithThemeAndIntl,
} from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"
import { VirtuosoMockContext } from "react-virtuoso"

type Props = ComponentProps<typeof ContactList>

const defaultProps: Props = {
  contactList: [],
  selectedItems: [],
  onEdit: jest.fn(),
  onBlock: jest.fn(),
  onDelete: jest.fn(),
  onExport: jest.fn(),
  onForward: jest.fn(),
  onSelect: jest.fn(),
  onUnblock: jest.fn(),
  toggleRow: jest.fn(),
  selectedContact: null,
  resultsState: ResultState.Empty,
  editMode: false,
}

const johnContact: Contact = {
  id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "123 456 789",
  email: "example@mudita.com",
  note: "",
  firstAddressLine: "",
}

const kareemContact: Contact = {
  id: "8fa0b2b48377-13b7-4f42-962d-274970a2",
  firstName: "Kareem",
  lastName: "Doe",
  primaryPhoneNumber: "123 789 456",
  email: "example@mudita.com",
  note: "",
  firstAddressLine: "",
}

const harryContact: Contact = {
  id: "8fa0b2b48377-13b7-4f42-962d-274970a2",
  firstName: "Harry",
  lastName: "Brown",
  primaryPhoneNumber: "666 888 999",
  email: "example@mudita.com",
  note: "",
  firstAddressLine: "",
}

const contactList: ContactCategory[] = [
  {
    category: johnContact.lastName?.charAt(0) ?? "#",
    contacts: [kareemContact, johnContact],
  },
]

const contactListWithHarry: ContactCategory[] = [
  {
    category: johnContact.lastName?.charAt(0) ?? "#",
    contacts: [kareemContact, johnContact],
  },
  {
    category: harryContact.lastName?.charAt(0) ?? "#",
    contacts: [harryContact],
  },
]

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(
    <VirtuosoMockContext.Provider
      value={{ viewportHeight: 300, itemHeight: 5 }}
    >
      <ContactList {...props} />
    </VirtuosoMockContext.Provider>
  )

  return {
    ...outcome,

    rerender: (newExtraProps: Partial<Props>) => {
      const newProps = {
        ...defaultProps,
        ...newExtraProps,
      }
      outcome.rerender(
        constructWrapper(
          <VirtuosoMockContext.Provider
            value={{ viewportHeight: 300, itemHeight: 5 }}
          >
            <ContactList {...newProps} />
          </VirtuosoMockContext.Provider>
        )
      )
    },
  }
}

describe("`ContactList` component", () => {
  test("Empty phonebook is rendered as default state", () => {
    const { queryByTestId } = render()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListEmpty)
    ).toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListLoading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListNoResult)
    ).not.toBeInTheDocument()
  })

  test("Empty phonebook is rendered if resultState is equal to Error", () => {
    const { queryByTestId } = render({ resultsState: ResultState.Error })
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListEmpty)
    ).toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListLoading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListNoResult)
    ).not.toBeInTheDocument()
  })

  test("Loading component is rendered if resultState is Loading", () => {
    const { queryByTestId } = render({
      resultsState: ResultState.Loading,
      contactList,
    })
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListLoading)
    ).toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListEmpty)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListNoResult)
    ).not.toBeInTheDocument()
  })

  test("No results is rendered if resultState is Loaded and contactList is empty", () => {
    const { queryByTestId } = render({ resultsState: ResultState.Loaded })
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListNoResult)
    ).toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListLoading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListEmpty)
    ).not.toBeInTheDocument()
  })

  test("Contact list is rendered if resultState is Loaded and contactList isn't empty", () => {
    const { queryByTestId } = render({
      resultsState: ResultState.Loaded,
      contactList,
    })
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListWithResults)
    ).toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListLoading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListEmpty)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactListTestIdsEnum.ContactListNoResult)
    ).not.toBeInTheDocument()
  })

  describe("when edit mode is turned on and all rows are inactive (new johnContact state)", () => {
    const extraProps: Partial<Props> = {
      resultsState: ResultState.Loaded,
      contactList,
      editMode: true,
    }

    test("each row is disabled", () => {
      const { queryAllByTestId } = render(extraProps)

      queryAllByTestId(VirtualizedContactListItemTestIds.ContactRow).forEach(
        (item) => {
          expect(item).toHaveAttribute("disabled")
        }
      )
    })
  })

  describe("when edit mode is turned on and one of the rows is active (edit johnContact state)", () => {
    const extraProps: Partial<Props> = {
      resultsState: ResultState.Loaded,
      contactList,
      editMode: true,
      activeRow: contactList[0].contacts[0],
    }

    test("each row is disabled expect the active one", () => {
      const { queryAllByTestId } = render(extraProps)

      const rows = queryAllByTestId(
        VirtualizedContactListItemTestIds.ContactRow
      )
      const [firstRow, ...restRows] = rows

      expect(firstRow).toBeEnabled()
      restRows.forEach((item) => {
        expect(item).toHaveAttribute("disabled")
      })
    })
  })

  test("passing new contacts to the component renders them correctly", async () => {
    const { queryAllByTestId, queryByText, rerender } = render({
      resultsState: ResultState.Loaded,
      contactList,
    })

    expect(
      queryAllByTestId(VirtualizedContactListItemTestIds.ContactRow)
    ).toHaveLength(2)
    expect(queryByText("John Doe")).toBeInTheDocument()
    expect(queryByText("Kareem Doe")).toBeInTheDocument()
    expect(queryByText("Harry Brown")).not.toBeInTheDocument()

    rerender({
      resultsState: ResultState.Loaded,
      contactList: contactListWithHarry,
    })

    await waitFor(() => {
      expect(
        queryAllByTestId(VirtualizedContactListItemTestIds.ContactRow)
      ).toHaveLength(3)
      expect(queryByText("John Doe")).toBeInTheDocument()
      expect(queryByText("Kareem Doe")).toBeInTheDocument()
      expect(queryByText("Harry Brown")).toBeInTheDocument()
    })
  })
})
