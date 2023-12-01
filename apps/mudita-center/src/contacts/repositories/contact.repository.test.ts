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
  create: jest.fn().mockImplementationOnce((value: Contact) => value),
  update: jest.fn().mockImplementationOnce((value: Contact) => value),
  delete: jest.fn().mockImplementationOnce((value: string) => value),
} as unknown as ContactModel

const subject = new ContactRepository(contactModel)

describe("`ContactRepository`", () => {
  test("fire `delete` call `contactModel.delete` with string", () => {
    expect(subject.delete("1")).toBeUndefined()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(contactModel.delete).toHaveBeenCalledWith("1", false)
  })

  test("fire `create` call `contactModel.create` with contact", () => {
    expect(subject.create(contact)).toEqual(contact)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(contactModel.create).toHaveBeenCalledWith(contact, false)
  })

  test("fire `update` call `contactModel.update` with contact", () => {
    expect(subject.update(contact)).toEqual(contact)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(contactModel.update).toHaveBeenCalledWith(contact, false)
  })
})
