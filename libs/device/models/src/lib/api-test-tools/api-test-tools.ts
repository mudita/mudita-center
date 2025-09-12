/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const ApiSerialPortTestDataValidator = z.object({
  bytesCount: z.number(),
  data: z.string(),
})

export type ApiSerialPortTestData = z.infer<
  typeof ApiSerialPortTestDataValidator
>
