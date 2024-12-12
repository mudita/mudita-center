/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  entityTypes: z.array(z.string()).min(1),
})

export type McContactsView = z.infer<typeof configValidator>

export const mcContactsView = {
  key: "mc-contacts-view",
  dataValidator,
  configValidator,
} as const
