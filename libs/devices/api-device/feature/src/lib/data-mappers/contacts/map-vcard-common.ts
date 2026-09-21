/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AddressType,
  EmailAddressType,
  PhoneNumberType,
  UrlType,
} from "devices/common/models"

const pickType = <T extends string>(
  types: string[] | undefined,
  knownTypes: Record<string, T>,
  fallback: T
): T => {
  const match = types
    ?.map((type) => type.toLowerCase())
    .find((type) => type in knownTypes)

  return match ? knownTypes[match] : fallback
}

/**
 * Every vCard version names a mobile number "cell" (vCard 2.1 TEL sub-types,
 * RFC 2426 sec. 3.3.1, RFC 6350 sec. 6.4.1), while the contact model calls the
 * same thing "mobile", so the specification's name has to be translated.
 */
const PHONE_NUMBER_TYPES: Record<string, PhoneNumberType> = {
  cell: PhoneNumberType.Mobile,
  mobile: PhoneNumberType.Mobile,
  home: PhoneNumberType.Home,
  work: PhoneNumberType.Work,
}

const EMAIL_ADDRESS_TYPES: Record<string, EmailAddressType> = {
  home: EmailAddressType.Home,
  work: EmailAddressType.Work,
}

const ADDRESS_TYPES: Record<string, AddressType> = {
  home: AddressType.Home,
  work: AddressType.Work,
}

const URL_TYPES: Record<string, UrlType> = {
  home: UrlType.Home,
  work: UrlType.Work,
}

export const mapPhoneNumberType = (types?: string[]) =>
  pickType(types, PHONE_NUMBER_TYPES, PhoneNumberType.Other)

export const mapEmailAddressType = (types?: string[]) =>
  pickType(types, EMAIL_ADDRESS_TYPES, EmailAddressType.Other)

export const mapAddressType = (types?: string[]) =>
  pickType(types, ADDRESS_TYPES, AddressType.Other)

export const mapUrlType = (types?: string[]) =>
  pickType(types, URL_TYPES, UrlType.Other)

interface OrganizationProperty {
  value: { name?: string; unit?: string }
}

interface TextProperty {
  value: string
}

/**
 * ORG, TITLE and ROLE are separate properties that vCard relates only by
 * position, and a contact may well carry a title without an organisation, so
 * every position any of them reaches produces an entry - iterating ORG alone
 * drops a title that has no organisation next to it.
 *
 * TITLE is the job title and ROLE the function played (RFC 6350 sec. 6.6.1 and
 * 6.6.2). The contact model has a single field for both, so ROLE fills it in
 * where there is no TITLE instead of being dropped.
 */
export const mapOrganizations = (
  organizations: OrganizationProperty[] | undefined,
  titles: TextProperty[] | undefined,
  roles: TextProperty[] | undefined
) => {
  const count = Math.max(
    organizations?.length ?? 0,
    titles?.length ?? 0,
    roles?.length ?? 0
  )

  return Array.from({ length: count }, (_, index) => ({
    name: organizations?.[index]?.value.name,
    // An organisation with no unit has no department; the other contact
    // sources leave the field out rather than sending an empty string.
    department: organizations?.[index]?.value.unit || undefined,
    title: titles?.[index]?.value || roles?.[index]?.value,
  })).filter(
    (organization) =>
      organization.name || organization.department || organization.title
  )
}
