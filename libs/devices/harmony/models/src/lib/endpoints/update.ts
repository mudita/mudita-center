/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const HarmonyUpdateRequestValidator = z.object({
  update: z.boolean(),
  reboot: z.literal(true),
})

export const HarmonyUpdateResponseValidator = z.undefined().optional()
