/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ContactList from "App/contacts/components/contact-list/contact-list.component"
import { ResultsState } from "App/contacts/store/contacts.enum"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import { Contact } from "App/contacts/store/contacts.type"
import { ContactCategory } from "App/contacts/store/contacts.interface"

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

type Props = ComponentProps<typeof ContactList>

const defaultProps: Props = {
  contactList: [],
  getRowStatus: jest
    .fn()
    .mockReturnValue({ indeterminate: false, selected: false }),
  noneRowsSelected: false,
  onBlock: jest.fn(),
  onDelete: jest.fn(),
  onExport: jest.fn(),
  onForward: jest.fn(),
  onSelect: jest.fn(),
  onUnblock: jest.fn(),
  toggleRow: jest.fn(),
  selectedContact: null,
  resultsState: ResultsState.Empty,
  editMode: false,
}

const contact: Contact = {
  id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "123 456 789",
  email: "example@mudita.com",
  note: "",
  firstAddressLine: "",
}

const contactList: ContactCategory[] = [
  {
    category: contact.lastName?.charAt(0) ?? "#",
    contacts: [contact],
  },
]

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ContactList {...props} />)
}

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
  const { queryByTestId } = render({ resultsState: ResultsState.Error })
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
    resultsState: ResultsState.Loading,
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
  const { queryByTestId } = render({ resultsState: ResultsState.Loaded })
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
  const { queryByTestId, queryAllByTestId } = render({
    resultsState: ResultsState.Loaded,
    contactList,
  })
  expect(
    queryAllByTestId(ContactListTestIdsEnum.ContactListGroup)[0]
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
