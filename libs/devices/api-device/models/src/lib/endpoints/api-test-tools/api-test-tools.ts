/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const ApiTestToolsGetRequestValidator = z.object({
  data: z.string(),
  action: z.literal("send-serial-port-test-data"),
})

export type ApiTestToolsGetRequestV = z.infer<
  typeof ApiTestToolsGetRequestValidator
>

export const ApiTestToolsGetResponseValidator = z.object({
  bytesCount: z.number(),
  data: z.string(),
})

export type ApiTestToolsGetResponse = z.infer<
  typeof ApiTestToolsGetResponseValidator
>

export const buildApiTestToolsGetRequestValidator = (
  req: ApiTestToolsGetRequestV
) => {
  return {
    endpoint: "API_TEST_DATA",
    method: "GET",
    body: req,
  } as const
}
