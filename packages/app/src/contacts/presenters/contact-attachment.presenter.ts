/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { Contact } from "App/contacts/dto"

const messages = defineMessages({
  information: { id: "module.contacts.attachment.information" },
  address: { id: "module.contacts.attachment.address" },
  notes: { id: "module.contacts.attachment.notes" },
})

export class ContactAttachmentPresenter {
  static toAttachment(contact: Contact): string {
    const nameBlock = [contact.firstName, contact.lastName]
      .filter((item) => Boolean(item))
      .join(" ")
    const informationBlock = [
      contact.primaryPhoneNumber,
      contact.secondaryPhoneNumber,
      contact.email,
    ]
      .filter((item) => Boolean(item))
      .join("; ")
    const addressBlock = [contact.firstAddressLine, contact.secondAddressLine]
      .filter((item) => Boolean(item))
      .join(", ")

    return [
      ...(nameBlock ? [nameBlock, "\n"] : []),

      ...(informationBlock
        ? [intl.formatMessage(messages.information), informationBlock]
        : []),

      ...(addressBlock
        ? [intl.formatMessage(messages.address), addressBlock]
        : []),

      ...(contact.note
        ? [intl.formatMessage(messages.notes), contact.note]
        : []),
    ].join("\n")
  }
}
