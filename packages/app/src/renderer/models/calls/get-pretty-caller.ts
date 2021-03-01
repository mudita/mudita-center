/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { Caller } from "Renderer/models/calls/calls.interface"

const getPrettyCaller = (caller: Caller): string => {
  return isNameAvailable(caller) ? createFullName(caller) : caller.phoneNumber
}

export default getPrettyCaller
