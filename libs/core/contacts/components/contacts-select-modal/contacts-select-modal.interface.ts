/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/dto"

export interface ContactsSelectModalProps {
  open: boolean
  onClose: () => void
  onContactSelect: (contact: Contact) => void
  onPhoneNumberSelect?: (phoneNumber: string) => void
  title: string
  withPhoneNumberOnly: boolean
  testId?: string
}
