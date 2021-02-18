/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { Contact } from "App/contacts/store/contacts.type"

const getPrettyCaller = (contact: Contact, phoneNumber: string): string => {
  return isNameAvailable(contact) ? createFullName(contact) : phoneNumber
}

export default getPrettyCaller
