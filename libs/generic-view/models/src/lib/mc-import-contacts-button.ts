/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  text: z.string(),
})

export type McImportContactsButtonConfig = z.infer<typeof configValidator>

export const mcImportContactsButton = {
  key: "mc-import-contacts-button",
  dataValidator,
  configValidator,
} as const
