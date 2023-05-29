/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isNameAvailable } from "App/__deprecated__/renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { mapToRawNumber } from "App/messages/helpers"

const getPrettyCaller = (
  contact: Contact | undefined,
  phoneNumber: string
): string => {
  console.log("getPrettyCaller contact", contact, "phoneNumber", phoneNumber)

  const result = isNameAvailable(contact)
    ? createFullName(contact as Contact)
    : mapToRawNumber(phoneNumber)

  console.log("getPrettyCaller result", result)
  return result
}

export default getPrettyCaller
