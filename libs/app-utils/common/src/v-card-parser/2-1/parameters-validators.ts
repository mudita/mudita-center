/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import z from "zod"
import { clearQuotationMarks } from "../helpers/clear-quotation-marks"

const charsetParamValidator = z
  .string()
  .regex(/^CHARSET/i)
  .transform((value) => {
    const charsetValue = clearQuotationMarks(value.split(/^CHARSET./i)[1])
    return {
      param: "CHARSET",
      value: charsetValue,
    } as const
  })

const encodingParamValidator = z
  .string()
  .regex(/^ENCODING/i)
  .transform((value) => {
    const encodingValue = clearQuotationMarks(value.split(/^ENCODING./i)[1])
    return {
      param: "ENCODING",
      value: encodingValue,
    } as const
  })

const anyParamValidator = z.string().transform((value) => {
  return {
    param: "TYPE",
    value: value.toLowerCase(),
  }
})

export const paramsValidators = z.union([
  charsetParamValidator,
  encodingParamValidator,
  anyParamValidator,
])
