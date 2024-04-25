/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import { UnifiedContact } from "device/models"
import { getDisplayName } from "../helpers"
import { first, isArray, isEmpty, last } from "lodash"

type jCard = ReturnType<vCard["toJSON"]>

export const mapVcard = (data: jCard[]): UnifiedContact[] => {
  return data
    .map((jCard, index) => {
      const {
        lastName,
        firstName,
        middleName,
        honorificPrefix,
        honorificSuffix,
      } = getN(jCard)
      return {
        id: `${index}`,
        firstName,
        lastName,
        middleName,
        displayName: getDisplayName({ firstName, lastName, middleName }),
        honorificPrefix,
        honorificSuffix,
        phoneNumbers: getTel(jCard),
        emailAddresses: getEmail(jCard),
        addresses: getAdr(jCard),
        organizations: getOrg(jCard),
        urls: getUrl(jCard),
        note: getNote(jCard),
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
      const value = isArray(field[3]) ? first(field[3]) : field[3]
      return { type, value }
    })
    .filter(({ value }) => value) as {
    type?: string
    value: string | string[]
  }[]
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
  const field = item[1].find((property) => property[0] === "n")
  if (!field) return {}
  const [lastName, firstName, middleName, honorificPrefix, honorificSuffix] =
    field[3] as string[]
  return { lastName, firstName, middleName, honorificPrefix, honorificSuffix }
}

const getTel = (item: jCard): UnifiedContact["phoneNumbers"] => {
  const fields = getFields(item, "tel")
  return fields.map(({ type, value }) => ({ type, value: value as string }))
}

const getEmail = (item: jCard): UnifiedContact["emailAddresses"] => {
  const fields = getFields(item, "email")
  return fields.map(({ type, value }) => ({ type, value: value as string }))
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
      type,
      poBox,
      extendedAddress,
      streetAddress,
      city,
      region,
      postalCode,
      country,
      countryCode: country,
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
      name,
      department,
      title: titleField?.value as string,
    },
  ]
}

const getUrl = (item: jCard): UnifiedContact["urls"] => {
  const fields = getFields(item, "url")
  return fields.map(({ type, value }) => ({ type, value: value as string }))
}

const getNote = (item: jCard): UnifiedContact["note"] => {
  const field = first(getFields(item, "note"))
  return field?.value as string
}
