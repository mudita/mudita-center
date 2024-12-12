/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  entityTypes: z.array(z.string()).min(1),
})

export type McFileManagerView = z.infer<typeof configValidator>

export const mcFileManagerView = {
  key: "mc-file-manager-view",
  dataValidator,
  configValidator,
} as const
