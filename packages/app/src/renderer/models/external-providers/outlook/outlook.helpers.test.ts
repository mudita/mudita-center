/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { handleScope } from "Renderer/models/external-providers/outlook/outlook.helpers"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"

const scope = "offline_access, https://graph.microsoft.com/contacts.readwrite"

test("handleScope returns proper value", () => {
  expect(handleScope(OutLookScope.Contacts)).toBe(scope)
})
