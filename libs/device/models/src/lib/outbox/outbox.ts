/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const OutboxValidator = z.object({
  features: z.array(z.string()),
  data: z.array(z.string()),
})

export type Outbox = z.infer<typeof OutboxValidator>
