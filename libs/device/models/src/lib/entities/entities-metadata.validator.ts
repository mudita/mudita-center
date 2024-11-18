/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const entitiesMetadataValidator = z.object({
  totalEntities: z.number().nonnegative(),
})

export type EntitiesMetadata = z.infer<typeof entitiesMetadataValidator>
