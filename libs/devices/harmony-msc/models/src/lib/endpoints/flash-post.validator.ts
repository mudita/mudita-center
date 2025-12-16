/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const FlashPostRequestValidator = z.object({
  imagePath: z.string(),
  scriptPath: z.string(),
})

export type FlashPostRequest = z.infer<typeof FlashPostRequestValidator>

export const FlashPostResponseValidator = z.undefined().optional()
