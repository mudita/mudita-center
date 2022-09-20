/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact as PureContact } from "@mudita/pure"
import { ContactPresenter } from "App/contacts/presenters/contact.presenter"
import { Contact } from "App/contacts/reducers"

const pureContact: PureContact = {
  id: 19,
  address: "6 Czeczota St.\n02600 Warsaw",
  altName: "Boligłowa",
  blocked: false,
  favourite: true,
  numbers: ["500400300"],
  priName: "Alek",
  email: "",
}

const contact: Contact = {
  blocked: false,
  email: "",
  favourite: true,
  firstAddressLine: "6 Czeczota St.",
  firstName: "Alek",
  ice: false,
  id: "19",
  lastName: "Boligłowa",
  note: "",
  primaryPhoneNumber: "500400300",
  secondAddressLine: "02600 Warsaw",
  secondaryPhoneNumber: "",
}

describe("`ContactPresenter`", () => {
  test("`deserialize` record properly", () => {
    const result = ContactPresenter.mapToContact(pureContact)
    expect(result).toEqual(contact)
  })

  test("`serialize` record properly", () => {
    const result = ContactPresenter.mapToPureContact(contact)
    expect(result).toEqual(pureContact)
  })

  test("`serialize` record with email address", () => {
    const result = ContactPresenter.mapToPureContact({
      ...contact,
      email: "user@example.com",
    })
    expect(result).toEqual({
      ...pureContact,
      email: "user@example.com",
    })
  })
})
