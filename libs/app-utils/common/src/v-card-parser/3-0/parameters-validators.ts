/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import z from "zod"
import { splitByDelimiter } from "../helpers/split-by-delimiter"
import { clearQuotationMarks } from "../helpers/clear-quotation-marks"

const languageParamValidator = z
  .string()
  .regex(/^LANGUAGE/i)
  .transform((value) => {
    const langCode = clearQuotationMarks(value.split(/^LANGUAGE./i)[1])
    return {
      param: "LANGUAGE" as const,
      value: langCode,
    }
  })

const valueParamValues = z.union([
  z.literal("text"),
  z.literal("uri"),
  z.literal("date"),
  z.literal("date-time"),
  z.literal("boolean"),
  z.literal("integer"),
  z.literal("float"),
])

const valueParamValidator = z
  .string()
  .regex(/^VALUE/i)
  .refine((val) => {
    const dataType = val.split(/^VALUE./i)[1]
    return valueParamValues.safeParse(dataType).success
  }, "Invalid VALUE parameter")
  .transform((value) => {
    const dataType = value.split(/^VALUE./i)[1]
    return {
      param: "VALUE",
      value: dataType as z.infer<typeof valueParamValues>,
    } as const
  })

const typeParamValidator = z
  .string()
  .regex(/^TYPE/i)
  .transform((value) => {
    const typeValues = clearQuotationMarks(value.split(/^TYPE./i)[1])
    return {
      param: "TYPE",
      value: splitByDelimiter(typeValues, ",").map((val) => {
        return val.toLowerCase()
      }) as string[],
    } as const
  })

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

const contextParamValidator = z
  .string()
  .regex(/^CONTEXT/i)
  .transform((value) => {
    const contextValue = clearQuotationMarks(value.split(/^CONTEXT./i)[1])
    return {
      param: "CONTEXT",
      value: contextValue,
    } as const
  })

export const paramsValidators = z.union([
  languageParamValidator,
  valueParamValidator,
  typeParamValidator,
  charsetParamValidator,
  encodingParamValidator,
  contextParamValidator,
])
