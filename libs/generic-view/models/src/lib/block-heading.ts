/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const blockHeadingDataValidator = z.undefined()

const blockHeadingConfigValidator = z.object({
  heading: z.string(),
  subheading: z.string().optional(),
})

export type BlockHeadingConfig = z.infer<typeof blockHeadingConfigValidator>

export const blockHeading = {
  key: "block-heading",
  dataValidator: blockHeadingDataValidator,
  configValidator: blockHeadingConfigValidator,
} as const
