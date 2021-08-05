/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-empty-function */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import { waitFor, fireEvent } from "@testing-library/dom"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import ContactsUI from "App/contacts/contacts-ui.component"
import { noop } from "Renderer/utils/noop"
import { PhoneProps } from "App/contacts/contacts.type"
import { Contact } from "App/contacts/store/contacts.type"
import { ResultsState } from "App/contacts/store/contacts.enum"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import { ContactDetailsTestIds } from "App/contacts/components/contact-details/contact-details-test-ids.enum"

beforeAll(() => {
  mockAllIsIntersecting(true)
})

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

jest.mock("react-router", () => ({
  useLocation: () => ({
    search: "",
  }),
}))

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

const contactOne: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: true,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const contactTwo: Contact = {
  id: "1",
  firstName: "Luke",
  lastName: "Skywalker",
  primaryPhoneNumber: "+48 123 123 123",
  secondaryPhoneNumber: "",
  email: "example+1@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: true,
  favourite: false,
  blocked: false,
  firstAddressLine: "Jasna 3, Coruscant",
  secondAddressLine: "",
}

const renderer = (props: {}) => {
  const defaultProps: PhoneProps = {
    onSpeedDialSettingsSave: noop,
    getContact: (id: string) => {
      return [contactOne, contactTwo].find((contact) => contact.id === id)!
    },
    flatList: [],
    speedDialChosenList: [],
    setProviderData: noop,
    onManageButtonClick: async () => {},
    isThreadOpened: () => false,
    onMessage: noop,
    authorize: async () => undefined,
    addNewContact: async () => {},
    editContact: async () => {},
    deleteContacts: async () => {},
    loadContacts: async () => [],
    onExport: async () => {},
    onForward: async () => {},
    onBlock: async () => {},
    onUnblock: async () => {},
    onDelete: async () => {},
    onNewButtonClick: async () => {},
    selectedContacts: [],
    resetRows: async () => {},
    editedContact: contactOne,
    onEdit: noop,
    onCall: noop,
    loadData: async () => {},
    inputValue: "",
    contacts: [],
    savingContact: true,
    resultsState: ResultsState.Loaded,
    speedDialContacts: [],
    contactList: [
      {
        category: "#",
        contacts: [contactOne, contactTwo],
      },
    ],
  }

  return renderWithThemeAndIntl(<ContactsUI {...defaultProps} {...props} />)
}

test("changing contact details preview, when the user switching between contacts", async () => {
  const { getAllByTestId, getByTestId } = renderer({})

  mockAllIsIntersecting(0.1)

  fireEvent.click(getAllByTestId(ContactListTestIdsEnum.ContactRow)[0])

  await waitFor(() => {
    expect(getByTestId(ContactDetailsTestIds.PrimaryPhoneInput)).toHaveValue(
      contactOne.primaryPhoneNumber
    )
    expect(getByTestId(ContactDetailsTestIds.Name)).toHaveTextContent(
      [contactOne.firstName, contactOne.lastName].join(" ")
    )
    expect(getByTestId(ContactDetailsTestIds.AddressDetails)).toHaveTextContent(
      contactOne.firstAddressLine ?? ""
    )
  })

  fireEvent.click(getAllByTestId(ContactListTestIdsEnum.ContactRow)[1])

  await waitFor(() => {
    expect(getByTestId(ContactDetailsTestIds.PrimaryPhoneInput)).toHaveValue(
      contactTwo.primaryPhoneNumber
    )
    expect(getByTestId(ContactDetailsTestIds.Name)).toHaveTextContent(
      [contactTwo.firstName, contactTwo.lastName].join(" ")
    )
    expect(getByTestId(ContactDetailsTestIds.AddressDetails)).toHaveTextContent(
      contactTwo.firstAddressLine ?? ""
    )
  })
})
