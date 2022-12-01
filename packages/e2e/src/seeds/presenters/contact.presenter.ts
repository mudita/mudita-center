/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewContact } from "../types"
import { NewContact as PureNewContact } from "../../pure/types"

export class ContactPresenter {
  static mapToPureContact(contact: NewContact): PureNewContact {
    const {
      blocked = false,
      favourite = false,
      firstName = "",
      lastName = "",
      primaryPhoneNumber,
      secondaryPhoneNumber,
      firstAddressLine,
      secondAddressLine,
    } = contact
    const numbers = []
    if (primaryPhoneNumber) {
      numbers.push(primaryPhoneNumber)
    }
    if (secondaryPhoneNumber) {
      numbers.push(secondaryPhoneNumber)
    }

    return {
      blocked,
      favourite,
      numbers: numbers,
      priName: firstName,
      altName: lastName,
      address: [firstAddressLine, secondAddressLine].join("\n").trim(),
    }
  }
}
