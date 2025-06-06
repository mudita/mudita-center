/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  expandedButtonText: z.string(),
  collapsedButtonText: z.string(),
})

export type AccordionConfig = z.infer<typeof configValidator>

export const accordion = {
  key: "accordion",
  dataValidator,
  configValidator,
} as const
