/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Contact } from "App/contacts/store/contacts.type"
import {
  OutlookContactAddress,
  OutlookEmailAddress,
} from "Renderer/models/external-providers/outlook/outlook.interface"

interface ContactBuilderInterface {
  build(): Contact
  addId(id: string): void
  addFirstName(name: string): void
  addLastName(lastName: string): void
  addPhoneNumbers(phoneNumbers: Array<string | undefined>): void
  addAddress(address: OutlookContactAddress[]): void
  addEmailAddress(emails: OutlookEmailAddress[]): void
  addNote(note: string): void
}

export class ContactBuilder implements ContactBuilderInterface {
  private contact: Contact
  constructor() {
    this.contact = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      primaryPhoneNumber: "",
      secondaryPhoneNumber: "",
      firstAddressLine: "",
      secondAddressLine: "",
      ice: false,
      favourite: false,
      blocked: false,
    }
  }
  build(): Contact {
    return this.contact
  }

  addId(id: string) {
    this.contact.id = id
    return this
  }

  addFirstName(name = "") {
    this.contact.firstName = name
    return this
  }

  addLastName(lastName = "") {
    this.contact.lastName = lastName
    return this
  }

  addPhoneNumbers(phoneNumbers: Array<string | undefined>) {
    if (phoneNumbers.length === 1) {
      this.contact.primaryPhoneNumber = phoneNumbers[0]
    } else if (phoneNumbers.length > 1) {
      this.contact.primaryPhoneNumber = phoneNumbers[0]
      this.contact.secondaryPhoneNumber = phoneNumbers[1]
    }
    return this
  }

  addAddress(address: OutlookContactAddress[]) {
    if (address.length) {
      const { street, postalCode, city, countryOrRegion } = address[0]
      this.contact.firstAddressLine = street || ""
      this.contact.secondAddressLine = [postalCode, city, countryOrRegion]
        .filter(Boolean)
        .join(" ")
    }
    return this
  }

  addEmailAddress(emails: OutlookEmailAddress[]) {
    if (emails.length) {
      this.contact.email = emails[0].address
    }
    return this
  }

  addNote(note = "") {
    this.contact.note = note
    return this
  }
}
