/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { Contact } from "App/contacts/store/contacts.type"

const getPrettyCaller = (
  contact: Contact | undefined,
  phoneNumber: string
): string => {
  console.log("contact: ", contact)
  return isNameAvailable(contact)
    ? createFullName(contact as Contact)
    : phoneNumber
}

export default getPrettyCaller
