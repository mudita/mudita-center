/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type UnifiedContact = {
  id: string
  firstName?: string
  lastName?: string
  middleName?: string
  honorificPrefix?: string
  honorificSuffix?: string
  nickname?: string
  displayName: string
  phoneNumbers: {
    type?: string
    value: string
    preference?: number
  }[]
  emailAddresses: {
    value: string
    type?: string
    preference?: number
  }[]
  addresses: {
    type?: string
    streetAddress?: string
    extendedAddress?: string
    poBox?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
    countryCode?: string
  }[]
  organizations: {
    name?: string
    title?: string
    department?: string
  }[]
  urls: { value: string; type?: string; preference?: number }[]
  note?: string
}
