/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const entitiesDeletePartialSuccessValidator = z.object({
  failedIds: z.array(z.string()),
})
export type EntitiesDeletePartialSuccess = z.infer<
  typeof entitiesDeletePartialSuccessValidator
>
