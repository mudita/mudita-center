/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"

export interface ContactSimpleListItemProps {
  contact: Contact
  onContactSelect?: (contact: Contact) => void
  onPhoneNumberSelect?: (phoneNumber: string) => void
}
