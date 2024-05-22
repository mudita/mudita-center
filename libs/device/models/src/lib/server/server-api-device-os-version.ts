/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const ServerAPIDeviceOSVersionValidator = z.object({
  version: z.string().trim().min(1),
  text: z.string().trim().min(1),
})

export type ServerAPIDeviceOSVersion = z.infer<
  typeof ServerAPIDeviceOSVersionValidator
>
