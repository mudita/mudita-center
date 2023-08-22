/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers"
import { Contact as PureContact } from "App/device/types/mudita-os"

export class ContactPresenter {
  static mapToContact(
    pureContact: PureContact,
    numbers: string[] = []
  ): Contact {
    const {
      id,
      blocked,
      favourite,
      address = "",
      altName,
      priName,
    } = pureContact
    const [primaryPhoneNumber = "", secondaryPhoneNumber = ""] = numbers

    const firstAddressLine = address.substring(0, address.indexOf("\n"))
    const secondAddressLine = address.substring(address.indexOf("\n") + 1)

    return {
      blocked,
      favourite,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      firstAddressLine,
      secondAddressLine,
      id: String(id),
      firstName: priName,
      lastName: altName,
      // TODO: map missing fields in separate issue https://appnroll.atlassian.net/browse/PDA-571 (after EGD implementation)
      // speedDial: undefined,
      ice: false,
      note: "",
      email: "",
    }
  }

  static mapToPureContact(contact: Contact): PureContact {
    const {
      blocked = false,
      favourite = false,
      firstName = "",
      lastName = "",
      firstAddressLine,
      secondAddressLine,
      email,
      id,
    } = contact

    return {
      id: Number(id),
      blocked,
      favourite,
      email: email || "",
      priName: firstName,
      altName: lastName,
      address: [firstAddressLine, secondAddressLine].join("\n").trim(),
      numbersIDs: [],
    }
  }
}
