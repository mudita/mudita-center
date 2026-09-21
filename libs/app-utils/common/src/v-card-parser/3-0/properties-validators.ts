/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { splitByDelimiter } from "../helpers/split-by-delimiter"
import { unescapeValue } from "../helpers/unescape-value"
import { isExtensionProperty, isProperty } from "../helpers/property-name"
import { paramsValidators } from "./parameters-validators"
import { decodeValue } from "../helpers/decode-value"

const baseParser = (data: string) => {
  const [propertyWithParameters, ...value] = splitByDelimiter(data, ":", {
    stripQuotes: false,
  })
  const [name, ...parameters] = splitByDelimiter(propertyWithParameters, ";")

  const parsedParameters = parameters
    .map((param) => paramsValidators.safeParse(param))
    .filter(({ success }) => success)
    .map(({ data }) => data)
    .filter(Boolean)

  let joinedValue = value.join(":")

  const findTextParameter = (param: string) => {
    const found = parsedParameters.find((p) => p?.param === param)?.value
    return typeof found === "string" ? found : undefined
  }

  const encoding = findTextParameter("ENCODING")
  const charset = findTextParameter("CHARSET")

  if (encoding || charset) {
    joinedValue = decodeValue(joinedValue, charset, encoding)
  }

  return {
    name,
    value: joinedValue,
    parameters: parsedParameters.filter((p) => {
      return !["ENCODING", "CHARSET"].includes(p?.param || "")
    }),
  }
}

const fullNameValidator = z
  .string()
  .refine(isProperty("FN"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    return {
      type: "FN" as const,
      value: unescapeValue(value),
      parameters,
    } as const
  })

const nameValidator = z
  .string()
  .refine(isProperty("N"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    const [lastName, firstName, middleName, namePrefix, nameSuffix] =
      splitByDelimiter(value, ";", { stripQuotes: false }).map(unescapeValue)

    return {
      type: "N" as const,
      value: {
        firstName,
        lastName,
        middleName,
        namePrefix,
        nameSuffix,
      },
      parameters,
    } as const
  })

const nicknameValidator = z
  .string()
  .refine(isProperty("NICKNAME"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "NICKNAME" as const,
      value: splitByDelimiter(value, ",", { stripQuotes: false }).map(
        unescapeValue
      ),
      parameters,
    } as const
  })

/**
 * A tel URI carries the number after the scheme and may append parameters such
 * as an extension (RFC 3966 sec. 3). vCard 4.0 recommends the URI form for TEL
 * (RFC 6350 sec. 6.4.1) and producers write it with or without VALUE=uri, so
 * the scheme is stripped whenever the value actually is one.
 */
const parseTelephoneValue = (
  value: string,
  isUriValue: boolean
): { phoneNumber: string; extension?: string } => {
  if (!/^tel:/i.test(value) && !isUriValue) {
    return { phoneNumber: value }
  }

  const [uriPart = "", ...uriParameters] = splitByDelimiter(value, ";", {
    stripQuotes: false,
  })
  const extension = uriParameters
    .find((parameter) => /^ext=/i.test(parameter))
    ?.replace(/^ext=/i, "")

  return {
    phoneNumber: uriPart.replace(/^[a-z][a-z0-9+.-]*:/i, ""),
    extension,
  }
}

const telephoneValidator = z
  .string()
  .refine(isProperty("TEL"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    const isUriValue = parameters.some(
      (p) => p?.param === "VALUE" && p.value === "uri"
    )

    return {
      type: "TEL" as const,
      value: parseTelephoneValue(value, isUriValue),
      parameters,
    } as const
  })

const emailValidator = z
  .string()
  .refine(isProperty("EMAIL"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "EMAIL" as const,
      value: unescapeValue(value),
      parameters,
    } as const
  })

const addressValidator = z
  .string()
  .refine(isProperty("ADR"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    const [
      poBox,
      secondStreetAddress,
      streetAddress,
      city,
      state,
      zipCode,
      country,
    ] = splitByDelimiter(value, ";", { stripQuotes: false }).map(unescapeValue)

    return {
      type: "ADR" as const,
      value: {
        poBox,
        streetAddress,
        secondStreetAddress,
        city,
        state,
        zipCode,
        country,
      },
      parameters,
    } as const
  })

const organizationValidator = z
  .string()
  .refine(isProperty("ORG"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    // An organisation name may be followed by any number of
    // organisational units (RFC 2426 sec. 3.5.5).
    const [name, ...units] = splitByDelimiter(value, ";", {
      stripQuotes: false,
    }).map(unescapeValue)

    return {
      type: "ORG" as const,
      value: {
        name,
        unit: units.filter(Boolean).join(", "),
      },
      parameters,
    } as const
  })

const titleValidator = z
  .string()
  .refine(isProperty("TITLE"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "TITLE" as const,
      value: unescapeValue(value),
      parameters,
    } as const
  })

const roleValidator = z
  .string()
  .refine(isProperty("ROLE"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "ROLE" as const,
      value: unescapeValue(value),
      parameters,
    } as const
  })

const noteValidator = z
  .string()
  .refine(isProperty("NOTE"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "NOTE" as const,
      value: unescapeValue(value),
      parameters,
    } as const
  })

const urlValidator = z
  .string()
  .refine(isProperty("URL"))
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "URL" as const,
      value,
      parameters,
    } as const
  })

const customPropertyValidator = z
  .string()
  .refine(isExtensionProperty)
  .transform((val) => {
    const { name, value, parameters } = baseParser(val)

    return {
      type: name as `X-${string}`,
      value,
      parameters,
    } as const
  })

const baseValidators = z.union([
  nicknameValidator,
  addressValidator,
  telephoneValidator,
  emailValidator,
  organizationValidator,
  titleValidator,
  roleValidator,
  noteValidator,
  fullNameValidator,
  nameValidator,
  urlValidator,
  customPropertyValidator,
])

// A group name prefixes the property it belongs to. RFC 6350 sec. 3.3 defines
// it as group = 1*(ALPHA / DIGIT / "-"), and vCard 2.1 ("Grouping") requires a
// reader to parse a grouped property (sec. 2.1.4), so it is not limited to
// "item<N>".
const groupNameValidator = z.string().regex(/^[A-Za-z0-9-]+\./)

const withoutGroupName = (val: string) => {
  const [, ...propertyParts] = splitByDelimiter(val, ".")
  return propertyParts.join(".")
}

const groupedPropertyValidator = z
  .string()
  .refine((val) => groupNameValidator.safeParse(val).success)
  // The grouped property has to be one we support; rejecting it here keeps an
  // unsupported one from failing the whole file instead of just its own line.
  .refine((val) => baseValidators.safeParse(withoutGroupName(val)).success)
  .transform((val) => {
    const [groupName] = splitByDelimiter(val, ".")
    const result = baseValidators.parse(withoutGroupName(val))

    return {
      type: result.type,
      value: result.value,
      parameters: [
        ...result.parameters,
        {
          param: "CUSTOM_GROUP_NAME",
          value: groupName,
        },
      ],
    } as const
  })

export const validators = z.union([baseValidators, groupedPropertyValidator])
