/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isNameAvailable } from "Core/__deprecated__/renderer/components/rest/messages/is-name-available"
import { createFullName } from "Core/contacts/helpers/contacts.helpers"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { mapToRawNumber } from "Core/messages/helpers/index"

const getPrettyCaller = (
  contact: Contact | undefined,
  phoneNumber: string
): string => {
  return isNameAvailable(contact)
    ? createFullName(contact as Contact)
    : mapToRawNumber(phoneNumber)
}

export default getPrettyCaller
