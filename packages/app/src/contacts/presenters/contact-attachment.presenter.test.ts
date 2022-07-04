/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactAttachmentPresenter } from "App/contacts/presenters/contact-attachment.presenter"
import { Contact } from "App/contacts/dto"

const contact: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "+1 911 020 12 23",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: true,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "00-000 Somewhere",
}

describe("Method: toAttachment", () => {
  test("Completed contact returns fully serialized attachment string", () => {
    expect(ContactAttachmentPresenter.toAttachment(contact)).toEqual(
      `Sławomir Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
    )
  })

  describe("Partly provided names", () => {
    test("Contact without firstName returns attachment without first name", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          firstName: "",
        })
      ).toEqual(
        `Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })

    test("Contact without lastName returns attachment without last name", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          lastName: "",
        })
      ).toEqual(
        `Sławomir


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })

    test("Contact without names returns attachment without first row", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          firstName: "",
          lastName: "",
        })
      ).toEqual(
        `[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })
  })

  describe("Partly provided contact information", () => {
    test("Contact without primaryPhoneNumber returns attachment without first number", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          primaryPhoneNumber: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.information
+1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })

    test("Contact without secondaryPhoneNumber returns attachment without second number", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          secondaryPhoneNumber: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })

    test("Contact without email returns attachment without email", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          email: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })

    test("Contact without contact information don't returns information row", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          primaryPhoneNumber: "",
          secondaryPhoneNumber: "",
          email: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })
  })

  describe("Partly provided address information", () => {
    test("Contact without firstAddressLine returns attachment without first line of address", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          firstAddressLine: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
00-000 Somewhere
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })

    test("Contact without secondAddressLine returns attachment without second line of address", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          secondAddressLine: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })

    test("Contact without address information returns attachment without address row", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          firstAddressLine: "",
          secondAddressLine: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.notes
sapiente rem dignissimos sunt`
      )
    })
  })

  describe("Partly provided notes", () => {
    test("Contact without notes returns attachment without notes row", () => {
      expect(
        ContactAttachmentPresenter.toAttachment({
          ...contact,
          note: "",
        })
      ).toEqual(
        `Sławomir Borewicz


[value] module.contacts.attachment.information
+71 195 069 214; +1 911 020 12 23; example@mudita.com
[value] module.contacts.attachment.address
Malczewskiego 3, Warszawa, 00-000 Somewhere`
      )
    })
  })
})
