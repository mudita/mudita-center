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
  z.literal("date-and-or-time"),
  z.literal("time"),
  z.literal("timestamp"),
  z.literal("boolean"),
  z.literal("integer"),
  z.literal("float"),
  z.literal("utc-offset"),
  z.literal("language-tag"),
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

const prefParam = z
  .string()
  .refine((val) => {
    try {
      const num = parseInt(val)
      return isNaN(num) ? false : num >= 1 && num <= 100
    } catch {
      return false
    }
  }, "PREF parameter must be an integer between 1 and 100")
  .transform((val) => parseInt(val))

const prefParamValidator = z
  .string()
  .regex(/^PREF/i)
  .refine((val) => {
    const prefValue = val.split(/^PREF./i)[1]
    return prefParam.safeParse(prefValue).success
  }, "Invalid PREF parameter")
  .transform((value) => {
    const prefValue = value.split(/^PREF./i)[1]
    return {
      param: "PREF",
      value: prefParam.safeParse(prefValue).data,
    } as const
  })

const altIdParamValidator = z
  .string()
  .regex(/^ALTID/i)
  .transform((value) => {
    const altIdValue = clearQuotationMarks(value.split(/^ALTID./i)[1])
    return {
      param: "ALTID",
      value: altIdValue,
    } as const
  })

const pidParam = z.string().regex(/^(\d+[,.]?)+$/)

const pidParamValidator = z
  .string()
  .regex(/^PID/i)
  .refine((val) => {
    const pidValue = val.split(/^PID./i)[1]
    return pidParam.safeParse(pidValue).success
  }, "Invalid PID parameter")
  .transform((value) => {
    const pidValues = clearQuotationMarks(value.split(/^PID./i)[1]).split(",")
    return {
      param: "PID",
      value: pidValues,
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
      }),
    } as const
  })

const mediaTypeParamValidator = z
  .string()
  .regex(/^MEDIATYPE/i)
  .transform((value) => {
    const mediaTypeValue = clearQuotationMarks(value.split(/^MEDIATYPE./i)[1])
    return {
      param: "MEDIATYPE",
      value: mediaTypeValue,
    } as const
  })

const calScaleParamValidator = z
  .string()
  .regex(/^CALSCALE/i)
  .transform((value) => {
    const calscaleValue = clearQuotationMarks(value.split(/^CALSCALE./i)[1])
    return {
      param: "CALSCALE",
      value: calscaleValue,
    } as const
  })

const sortAsParamValidator = z
  .string()
  .regex(/^SORT-AS/i)
  .transform((value) => {
    const sortAsValue = clearQuotationMarks(value.split(/^SORT-AS./i)[1])
    return {
      param: "SORT-AS",
      value: splitByDelimiter(sortAsValue, ","),
    } as const
  })

const geoParam = z.string().regex(/^geo:[\d.-]+,[\d.-]+$/)

const geoParamValidator = z
  .string()
  .regex(/^GEO/i)
  .refine((val) => {
    const geoValue = val.split(/^GEO./i)[1]
    return geoParam.safeParse(geoValue).success
  }, "Invalid GEO parameter")
  .transform((value) => {
    const [lat, lng] = clearQuotationMarks(value.split(/^GEO./i)[1])
      .replace(/^geo:/i, "")
      .split(",")
    return {
      param: "GEO",
      value: { lat: parseFloat(lat), lng: parseFloat(lng) },
    } as const
  })

const tzParamValidator = z
  .string()
  .regex(/^TZ/i)
  .transform((value) => {
    const tzValue = clearQuotationMarks(value.split(/^TZ./i)[1])
    return {
      param: "TZ",
      value: tzValue,
    } as const
  })

export const paramsValidators = z.union([
  languageParamValidator,
  valueParamValidator,
  prefParamValidator,
  altIdParamValidator,
  pidParamValidator,
  typeParamValidator,
  mediaTypeParamValidator,
  calScaleParamValidator,
  sortAsParamValidator,
  geoParamValidator,
  tzParamValidator,
])
