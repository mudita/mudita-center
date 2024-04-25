/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const addKompaktValidator = z.object({
  path: z.string().min(1),
  serialNumber: z.string().min(1),
})

export type AddKompakt = z.infer<typeof addKompaktValidator>
