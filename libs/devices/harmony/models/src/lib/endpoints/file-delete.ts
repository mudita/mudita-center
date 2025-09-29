/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const HarmonyDeleteFileRequestValidator = z.object({
  removeFile: z.string(),
})

export const HarmonyDeleteFileResponseValidator = z.undefined().optional()
