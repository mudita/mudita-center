/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import z from "zod"
import { clearQuotationMarks } from "../helpers/clear-quotation-marks"
import { splitByDelimiter } from "../helpers/split-by-delimiter"

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

/**
 * vCard 2.1 writes a sub-type as a bare parameter ("TEL;HOME:"), but producers
 * that also emit later versions often keep the "TYPE=" form. Both are accepted,
 * and a comma separated list is split the way 3.0 and 4.0 write it.
 */
const anyParamValidator = z.string().transform((value) => {
  return {
    param: "TYPE",
    value: splitByDelimiter(value.replace(/^TYPE=/i, ""), ",").map((val) =>
      val.trim().toLowerCase()
    ),
  }
})

export const paramsValidators = z.union([
  charsetParamValidator,
  encodingParamValidator,
  anyParamValidator,
])
