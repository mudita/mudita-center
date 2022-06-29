/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-empty-function */

import React, { ComponentProps } from "react"
import { waitFor, fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import Contacts from "App/contacts/components/contacts/contacts.component"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import { ContactDetailsTestIds } from "App/contacts/components/contact-details/contact-details-test-ids.enum"
import { isContactMatching } from "App/contacts/components/contacts/contacts.component"
import { InputSearchTestIds } from "App/__deprecated__/renderer/components/core/input-search/input-search.component"
import { ContactInputSelectTestIds } from "App/contacts/components/contact-input-search/contact-input-select-test-ids.enum"
import { Contact, ResultState } from "App/contacts/reducers/contacts.interface"

type Props = ComponentProps<typeof Contacts>

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

const contacts: Contact[] = [
  {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71195069214",
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
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    secondaryPhoneNumber: "+62761294266",
    email: "oswald.bednar@mudita.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "East Percivalberg",
  },
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    secondaryPhoneNumber: "761294266",
    email: "oswald.bednar@mudita.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "Bednarów 3",
  },
  {
    id: "6e3810c8-c917",
    firstName: "Oswald",
    lastName: "Bednar",
  },
]

const defaultProps: Props = {
  getContact: (id: string) => {
    return [contactOne, contactTwo].find((contact) => contact.id === id)!
  },
  exportContacts: jest.fn(),
  addNewContact: jest.fn(),
  importContact: jest.fn(),
  authorize: jest.fn(),
  deleteContacts: jest.fn(),
  editContact: jest.fn(),
  loadContacts: jest.fn(),
  addNewContactsToState: jest.fn(),
  isThreadOpened: jest.fn(),
  onBlock: jest.fn(),
  onCall: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  onExport: jest.fn(),
  onForward: jest.fn(),
  onManageButtonClick: jest.fn(),
  onMessage: jest.fn(),
  onNewButtonClick: jest.fn(),
  onSpeedDialSettingsSave: jest.fn(),
  onUnblock: jest.fn(),
  resetRows: jest.fn(),
  setProviderData: jest.fn(),
  resultState: ResultState.Loaded,
  speedDialChosenList: [],
  contactList: [
    {
      category: "#",
      contacts: [contactOne, contactTwo],
    },
  ],
  contacts: [],
  flatList: [],
  selectedContacts: [],
  speedDialContacts: [],
  editMode: false,
  inputValue: "",
  searchValue: "",
  onSearchValueChange: jest.fn(),
  results: [],
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(<Contacts {...defaultProps} {...props} />)
}

beforeAll(() => {
  mockAllIsIntersecting(true)
})

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

describe("isContactMatching", () => {
  test("returns true when search string in email", () => {
    const searchString = "example"
    const result = isContactMatching(contacts[0], searchString)
    expect(result).toBe(true)
  })

  test("returns true when search string in primaryPhoneNumber", () => {
    const searchString = "069"
    const result = isContactMatching(contacts[0], searchString)
    expect(result).toBe(true)
  })

  test("returns false when no match ", () => {
    const searchString = "000"
    const result = isContactMatching(contacts[0], searchString)
    expect(result).toBe(false)
  })

  test("returns true when match and if contact don't have all params ", () => {
    const searchString = "Bednarów 3"
    const result = isContactMatching(contacts[3], searchString)
    expect(result).toBe(false)
  })
})

test("first name and second name in search shows correct result", () => {
  const { queryByTestId, getByTestId } = renderer({ flatList: contacts })
  const input = queryByTestId(
    ContactInputSelectTestIds.Input
  ) as HTMLInputElement
  fireEvent.change(input, { target: { value: "Oswald Bednar" } })
  expect(getByTestId(InputSearchTestIds.List).childNodes).toHaveLength(4)
})
