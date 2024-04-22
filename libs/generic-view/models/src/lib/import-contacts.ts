/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  modalKey: z.string(),
})

export type ImportContactsConfig = z.infer<typeof configValidator>

export const importContacts = {
  key: "import-contacts",
  dataValidator,
  configValidator,
} as const
