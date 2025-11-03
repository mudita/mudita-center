/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const response200Schema = z.object({
  _status: z.literal(200),
})

export const response202Schema = z.object({
  _status: z.literal(202),
})

export const response207Schema = z.object({
  _status: z.literal(207),
})

export const emptyBodySchema = z
  .object({
    _status: z.any(),
  })
  .optional()
