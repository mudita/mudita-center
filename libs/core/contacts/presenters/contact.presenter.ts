/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/reducers"
import { Contact as PureContact } from "Core/device/types/mudita-os"

export class ContactPresenter {
  static mapToContact(pureContact: PureContact): Contact {
    const {
      id,
      favourite,
      address = "",
      altName,
      priName,
      numbers: [primaryPhoneNumber = "", secondaryPhoneNumber = ""],
    } = pureContact

    const firstAddressLine = address.substr(0, address.indexOf("\n"))
    const secondAddressLine = address.substr(address.indexOf("\n") + 1)

    return {
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
      favourite = false,
      firstName = "",
      lastName = "",
      primaryPhoneNumber,
      secondaryPhoneNumber,
      firstAddressLine,
      secondAddressLine,
      email,
      id,
    } = contact
    const numbers = []
    if (primaryPhoneNumber) {
      numbers.push(primaryPhoneNumber)
    }
    if (secondaryPhoneNumber) {
      numbers.push(secondaryPhoneNumber)
    }

    return {
      id: Number(id),
      favourite,
      email: email || "",
      numbers: numbers,
      priName: firstName,
      altName: lastName,
      address: [firstAddressLine, secondAddressLine].join("\n").trim(),
    }
  }
}
