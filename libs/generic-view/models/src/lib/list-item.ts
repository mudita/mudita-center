/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { buttonActionsValidator } from "./common-validators"

const dataValidator = z.undefined()

const configValidator = z.object({
  active: z.boolean().optional(),
  actions: buttonActionsValidator.optional(),
}).optional()

export type ListItemConfig = z.infer<typeof configValidator>

export const listItem = {
  key: "list-item",
  dataValidator,
  configValidator,
} as const
