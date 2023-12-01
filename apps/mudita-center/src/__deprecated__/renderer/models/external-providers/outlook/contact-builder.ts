/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers/contacts.interface"
import {
  OutlookContactAddress,
  OutlookEmailAddress,
} from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"

interface ContactBuilderInterface {
  build(): Contact
  addId(id: string): this
  addFirstName(name: string): this
  addLastName(lastName: string): this
  addPhoneNumbers(phoneNumbers: Array<string | undefined>): this
  addAddress(address: OutlookContactAddress[]): this
  addEmailAddress(emails: OutlookEmailAddress[]): this
  addNote(note: string): this
}

export class ContactBuilder implements ContactBuilderInterface {
  private contact: Contact = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    primaryPhoneNumber: "",
    firstAddressLine: "",
    secondAddressLine: "",
    ice: false,
    favourite: false,
    blocked: false,
  }
  build(): Contact {
    return { ...this.contact }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addId(id: string) {
    this.contact.id = id
    return this
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addFirstName(name = "") {
    this.contact.firstName = name
    return this
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addLastName(lastName = "") {
    this.contact.lastName = lastName
    return this
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addPhoneNumbers(phoneNumbers: Array<string | undefined>) {
    const filteredPhoneNumbers = phoneNumbers.filter(Boolean)
    this.contact.primaryPhoneNumber = filteredPhoneNumbers[0] || ""
    this.contact.secondaryPhoneNumber = filteredPhoneNumbers[1]
    return this
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addAddress(addresses: OutlookContactAddress[]) {
    const filteredAddresses = addresses.filter(
      (address) => Object.keys(address).length !== 0
    )
    if (filteredAddresses.length) {
      const { street, postalCode, city, countryOrRegion } = filteredAddresses[0]
      this.contact.firstAddressLine = street || ""
      this.contact.secondAddressLine = [postalCode, city, countryOrRegion]
        .filter(Boolean)
        .join(" ")
    }
    return this
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addEmailAddress(emails: OutlookEmailAddress[]) {
    if (emails.length) {
      this.contact.email = emails[0].address
    }
    return this
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addNote(note = "") {
    this.contact.note = note
    return this
  }
}
