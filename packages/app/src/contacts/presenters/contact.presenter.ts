/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers"
import { Contact as PureContact } from "@mudita/pure"

export class ContactPresenter {
  public serialize(pureContact: PureContact): Contact {
    const {
      id,
      blocked,
      favourite,
      address = "",
      altName,
      priName,
      numbers: [primaryPhoneNumber = "", secondaryPhoneNumber = ""],
    } = pureContact

    const firstAddressLine = address.substr(0, address.indexOf("\n"))
    const secondAddressLine = address.substr(address.indexOf("\n") + 1)

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
}
