/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const entityDataSchema = z.record(z.string(), z.unknown())
export type EntityData = z.infer<typeof entityDataSchema>
