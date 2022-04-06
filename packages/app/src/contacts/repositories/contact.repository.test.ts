/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactRepository } from "App/contacts/repositories/contact.repository"
import { ContactModel } from "App/contacts/models"
import { Contact } from "App/contacts/reducers"

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
  update: jest.fn(),
} as unknown as ContactModel

const subject = new ContactRepository(contactModel)

describe("`ContactRepository`", () => {
  test("fire `delete` call `contactModel.delete` with string", () => {
    subject.delete("1")
    expect(contactModel.delete).toHaveBeenCalledWith("1", false)
  })

  test("fire `create` call `contactModel.create` with contact", () => {
    subject.create(contact)
    expect(contactModel.create).toHaveBeenCalledWith(contact, false)
  })

  test("fire `update` call `contactModel.update` with contact", () => {
    subject.update(contact)
    expect(contactModel.update).toHaveBeenCalledWith(contact, false)
  })
})
