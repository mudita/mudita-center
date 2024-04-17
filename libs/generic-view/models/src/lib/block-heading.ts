/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  heading: z.string(),
  subheading: z.string().optional(),
})

export type BlockHeadingConfig = z.infer<typeof configValidator>

export const blockHeading = {
  key: "block-heading",
  dataValidator,
  configValidator,
} as const
