/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import { UnifiedContact } from "device/models"
import { getDisplayName } from "../helpers"
import { first, isArray, isEmpty, last } from "lodash"

export type jCard = ReturnType<vCard["toJSON"]>

export const mapVcard = (data: jCard[]): UnifiedContact[] => {
  return data
    .map((jCard, index) => {
      const id = getId(jCard) || `${index}`
      const nameFields = getN(jCard)
      const note = getNote(jCard)
      const nickName = getNickname(jCard)
      return {
        id,
        ...nameFields,
        ...(nickName && { nickname: nickName }),
        displayName: getDisplayName(nameFields),
        phoneNumbers: getTel(jCard).filter(({ value }) => value),
        emailAddresses: getEmail(jCard).filter(({ value }) => value),
        addresses: getAdr(jCard).filter(({ type, ...item }) => !isEmpty(item)),
        organizations: getOrg(jCard).filter((item) => !isEmpty(item)),
        urls: getUrl(jCard).filter(({ value }) => value),
        ...(note && { note }),
      }
    })
    .filter(
      ({ id, displayName, ...item }) => !Object.values(item).every(isEmpty)
    )
}

const getFields = (item: jCard, key: string) => {
  const fields = item[1].filter((property) => property[0] === key)
  return fields
    .map((field) => {
      const type = isArray(field[1].type) ? last(field[1].type) : field[1].type
      const value = field[3]
      return { type, value }
    })
    .filter(({ value }) => value)
}

const getId = (item: jCard) => {
  const field = first(getFields(item, "uid"))
  return field?.value as string | undefined
}

const getN = (
  item: jCard
): Pick<
  UnifiedContact,
  | "firstName"
  | "lastName"
  | "middleName"
  | "honorificPrefix"
  | "honorificSuffix"
> => {
  const { value } = first(getFields(item, "n")) || {}
  const [lastName, firstName, middleName, honorificPrefix, honorificSuffix] =
    value as string[]
  return {
    ...(lastName && { lastName }),
    ...(firstName && { firstName }),
    ...(middleName && { middleName }),
    ...(honorificPrefix && { honorificPrefix }),
    ...(honorificSuffix && { honorificSuffix }),
  }
}

const getNickname = (item: jCard): UnifiedContact["nickname"] => {
  const field = first(getFields(item, "nickname"))
  return (field?.value as string | undefined)?.split(",")[0]
}

const getTel = (item: jCard): UnifiedContact["phoneNumbers"] => {
  const fields = getFields(item, "tel")
  return fields.map(({ type, value }) => {
    return {
      type,
      value: (value as string).replace("tel:", ""),
    }
  })
}

const getEmail = (item: jCard): UnifiedContact["emailAddresses"] => {
  const fields = getFields(item, "email")
  return fields.map(({ type, value }) => {
    return {
      ...(type && { type }),
      value: value as string,
    }
  })
}

const getAdr = (item: jCard): UnifiedContact["addresses"] => {
  const fields = getFields(item, "adr")
  return fields.map(({ type, value }) => {
    const [
      poBox,
      extendedAddress,
      streetAddress,
      city,
      region,
      postalCode,
      country,
    ] = value as string[]
    return {
      ...(type && { type }),
      ...(poBox && { poBox }),
      ...(extendedAddress && { extendedAddress }),
      ...(streetAddress && { streetAddress }),
      ...(city && { city }),
      ...(region && { region }),
      ...(postalCode && { postalCode }),
      ...(country && { country }),
      ...(country && { countryCode: country }),
    }
  })
}

const getOrg = (item: jCard): UnifiedContact["organizations"] => {
  const orgField = first(getFields(item, "org"))
  const titleField = first(getFields(item, "title"))
  const [name, department] =
    (orgField?.value as string | undefined)?.split(";") || []
  return [
    {
      ...(name && { name }),
      ...(department && { department }),
      ...(titleField && { title: titleField.value as string }),
    },
  ]
}

const getUrl = (item: jCard): UnifiedContact["urls"] => {
  const fields = getFields(item, "url")
  return fields.map(({ type, value }) => ({
    type,
    value: value as string,
  }))
}

const getNote = (item: jCard): UnifiedContact["note"] => {
  const field = first(getFields(item, "note"))
  return field?.value as string | undefined
}
