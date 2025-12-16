/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { splitByDelimiter } from "../helpers/split-by-delimiter"
import { paramsValidators } from "./parameters-validators"
import { decodeValue } from "../helpers/decode-value"

const baseParser = (data: string) => {
  const [propertyWithParameters, ...value] = splitByDelimiter(data, ":")
  const [name, ...parameters] = propertyWithParameters.split(";")

  const parsedParameters = parameters
    .map((param) => paramsValidators.safeParse(param))
    .filter(({ success }) => success)
    .map(({ data }) => data)
    .filter(Boolean)

  let joinedValue = value.join(":")

  const encoding = parsedParameters.find((p) => p?.param === "ENCODING")?.value
  const charset = parsedParameters.find((p) => p?.param === "CHARSET")?.value

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
  .startsWith("FN")
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    return {
      type: "FN" as const,
      value,
      parameters,
    } as const
  })

const nameValidator = z
  .string()
  .startsWith("N")
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    const [lastName, firstName, middleName, namePrefix, nameSuffix] =
      value.split(";")

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

const telephoneValidator = z
  .string()
  .startsWith("TEL")
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "TEL" as const,
      value: {
        phoneNumber: value,
      },
      parameters,
    } as const
  })

const emailValidator = z
  .string()
  .startsWith("EMAIL")
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "EMAIL" as const,
      value,
      parameters,
    } as const
  })

const addressValidator = z
  .string()
  .startsWith("ADR")
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    const [
      poBox,
      streetAddress,
      secondStreetAddress,
      city,
      state,
      zipCode,
      country,
    ] = splitByDelimiter(value, ";")

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
  .startsWith("ORG")
  .transform((val) => {
    const { value, parameters } = baseParser(val)
    const [name, unit] = splitByDelimiter(value, ";")

    return {
      type: "ORG" as const,
      value: {
        name,
        unit,
      },
      parameters,
    } as const
  })

const titleValidator = z
  .string()
  .startsWith("TITLE")
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "TITLE" as const,
      value,
      parameters,
    } as const
  })

const roleValidator = z
  .string()
  .startsWith("ROLE")
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "ROLE" as const,
      value,
      parameters,
    } as const
  })

const noteValidator = z
  .string()
  .startsWith("NOTE")
  .transform((val) => {
    const { value, parameters } = baseParser(val)

    return {
      type: "NOTE" as const,
      value,
      parameters,
    } as const
  })

const urlValidator = z
  .string()
  .startsWith("URL")
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
  .startsWith("X-")
  .transform((val) => {
    const { name, value, parameters } = baseParser(val)

    return {
      type: name as `X-${string}`,
      value,
      parameters,
    } as const
  })

const baseValidators = z.union([
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

const itemValidator = z.string().regex(/^item\d+/)

const groupedPropertyValidator = z
  .string()
  .startsWith("item")
  .refine((val) => {
    return itemValidator.safeParse(val).success
  })
  .transform((val) => {
    const [groupName, ...propertyParts] = splitByDelimiter(val, ".")
    const propertyString = propertyParts.join(".")

    const result = baseValidators.safeParse(propertyString)
    if (!result.success) {
      throw new Error("Invalid grouped property")
    }

    return {
      type: result.data.type,
      value: result.data.value,
      parameters: [
        ...result.data.parameters,
        {
          param: "CUSTOM_GROUP_NAME",
          value: groupName,
        },
      ],
    } as const
  })

export const validators = z.union([baseValidators, groupedPropertyValidator])
