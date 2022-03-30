/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactRepository } from "App/contacts/repositories/contact.repository"
import { ContactModel } from "App/contacts/models"
import { Contact as PureContact } from "@mudita/pure"
import { Contact } from "App/contacts"

const pureContact: PureContact = {
  id: 19,
  address: "6 Czeczota St.\n02600 Warsaw",
  altName: "Boligłowa",
  blocked: false,
  favourite: true,
  numbers: ["500400300"],
  priName: "Alek",
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

const contactModel = {
  delete: jest.fn(),
  create: jest.fn(),
} as unknown as ContactModel

const subject = new ContactRepository(contactModel)

describe("`ContactRepository`", () => {
  test("fire `delete` call `contactModel.delete` with string argument", () => {
    subject.delete(1)
    expect(contactModel.delete).toHaveBeenCalledWith("1")
  })

  test("fire `create` call `contactModel.create`", () => {
    subject.create(pureContact)
    expect(contactModel.create).toHaveBeenCalledWith(contact)
  })
})
