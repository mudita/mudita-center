/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ContactSimpleListProps } from "App/contacts/components/contact-simple-list/contact-simple-list.interface"
import { ContactSimpleList } from "App/contacts/components/contact-simple-list/contact-simple-list.component"
import { ContactsHashTable } from "App/contacts/data-structures/contacts-hash-table.structure"
import { Contact } from "App/contacts/dto"
import { ContactSimpleListTestIdsEnum } from "App/contacts/components/contact-simple-list/contact-simple-list-test-ids.enum"

const render = (props: ContactSimpleListProps) =>
  renderWithThemeAndIntl(<ContactSimpleList {...props} />)

let contactsHash = new ContactsHashTable()

const onSelect = jest.fn()
const contacts: Contact[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "example@mudita.com",
    primaryPhoneNumber: "123 456 789",
    secondaryPhoneNumber: "32 123 44 55",
    firstAddressLine: "4929 Pine Garden Lane",
    secondAddressLine: "Atlanta, GA, 30339, USA",
    note: "",
  },
  {
    id: "2",
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
    id: "3",
    firstName: "Edmund",
    lastName: "",
    primaryPhoneNumber: "+46 333 060 911",
    secondaryPhoneNumber: "",
    email: "",
    note: "temporibus molestiae",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "016 McClure Curve",
    secondAddressLine: "",
  },
  {
    id: "4",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "911",
    secondaryPhoneNumber: "",
    email: "",
    note: "",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
]

beforeAll(() => {
  mockAllIsIntersecting(true)
})

describe("Contact list isn't empty", () => {
  beforeAll(() => {
    contacts.forEach((contact) => {
      contactsHash.push(contact)
    })
  })

  afterAll(() => {
    contactsHash = new ContactsHashTable()
  })

  test("Renders contact list", () => {
    const { getAllByTestId } = render({
      contacts: contactsHash,
      onSelect,
    })

    expect(
      getAllByTestId(ContactSimpleListTestIdsEnum.GroupLabel).length
    ).toBeGreaterThan(0)
  })

  test.each(["D", "B", "#"])("Contact list have group with name: %s", (i) => {
    const { getAllByTestId } = render({
      contacts: contactsHash,
      onSelect,
    })

    const groups = getAllByTestId(ContactSimpleListTestIdsEnum.GroupLabel)
    expect(groups.find((item) => item.textContent === i)).toBeInTheDocument()
  })
})

describe("Contact list isn empty", () => {
  test("Renders empty state", () => {
    const { getByTestId, getByText } = render({
      contacts: contactsHash,
      onSelect,
    })

    expect(
      getByTestId(ContactSimpleListTestIdsEnum.EmptyContent)
    ).toBeInTheDocument()
    expect(
      getByText("[value] module.contacts.emptyListTitle")
    ).toBeInTheDocument()
    expect(
      getByText("[value] module.contacts.emptySearchDescription")
    ).toBeInTheDocument()
  })
})
