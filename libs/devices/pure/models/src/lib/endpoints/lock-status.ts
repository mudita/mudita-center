/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const PureLockStatusRequestValidator = z.object({
  category: z.literal("phoneLockStatus"),
})

export const PureLockStatusResponseValidator = z.undefined().optional()
