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
import { FavouriteContactsHashTable } from "App/contacts/data-structures/favourite-contacts-hash-table.structure"
import { Contact } from "App/contacts/dto"
import { ContactSimpleListTestIdsEnum } from "App/contacts/components/contact-simple-list/contact-simple-list-test-ids.enum"

const render = (props: ContactSimpleListProps) =>
  renderWithThemeAndIntl(<ContactSimpleList {...props} />)

let contactsHash = new ContactsHashTable()
let favouriteContactsHash = new FavouriteContactsHashTable()

const onContactSelect = jest.fn()
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

const favouritesContacts: Contact = {
  id: "2",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: true,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

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
      onContactSelect,
    })

    expect(
      getAllByTestId(ContactSimpleListTestIdsEnum.GroupLabel).length
    ).toBeGreaterThan(0)
  })

  test.each(["d", "b", "e", "#"])(
    "Contact list have group with name: %s",
    (i) => {
      const { getAllByTestId } = render({
        contacts: contactsHash,
        onContactSelect,
      })

      const groups = getAllByTestId(ContactSimpleListTestIdsEnum.GroupLabel)
      expect(groups.find((item) => item.textContent === i)).toBeInTheDocument()
    }
  )
})

describe("Favourites list isn't empty", () => {
  beforeAll(() => {
    contacts.forEach((contact) => {
      contactsHash.push(contact)
    })
    favouriteContactsHash.push(favouritesContacts)
  })

  afterAll(() => {
    contactsHash = new ContactsHashTable()
    favouriteContactsHash = new FavouriteContactsHashTable()
  })

  test.each(["[value] module.contacts.favourites", "d", "b", "e", "#"])(
    "Contact list have group with name: %s",
    (i) => {
      const { getAllByTestId } = render({
        contacts: contactsHash,
        favouriteContacts: favouriteContactsHash,
        onContactSelect,
      })

      const groups = getAllByTestId(ContactSimpleListTestIdsEnum.GroupLabel)
      expect(groups.find((item) => item.textContent === i)).toBeInTheDocument()
    }
  )
})

describe("Contact list is empty", () => {
  test("Renders empty state", () => {
    const { getByTestId, getByText } = render({
      contacts: contactsHash,
      onContactSelect,
    })

    expect(
      getByTestId(ContactSimpleListTestIdsEnum.EmptyContent)
    ).toBeInTheDocument()
    expect(
      getByText("[value] module.contacts.noContactsListTitle")
    ).toBeInTheDocument()
    expect(
      getByText("[value] module.contacts.emptyPhonebook")
    ).toBeInTheDocument()
  })
})
