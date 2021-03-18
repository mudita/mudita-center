/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface TokenPayload {
  accessToken: string
  refreshToken: string
}

export interface OutlookAuthSuccessResponse {
  access_token: string
  refresh_token: string
}

export interface OutlookAuthErrorResponse {
  error: string
}

export enum OutLookScope {
  Contacts = "contacts",
}

export interface OutlookProviderState {
  [OutLookScope.Contacts]: TokenPayload
}

export interface OutlookContactAddress {
  street?: string
  city?: string
  postalCode?: string
  countryOrRegion?: string
}

export interface OutlookEmailAddress {
  address: string
  name: string
}

export interface OutlookContactResourceItem {
  id: string
  givenName?: string
  surname?: string
  mobilePhone?: string
  homePhones?: string[]
  businessPhones?: string[]
  homeAddress?: OutlookContactAddress
  businessAddress?: OutlookContactAddress
  otherAddress?: OutlookContactAddress
  emailAddresses?: OutlookEmailAddress[]
  personalNotes?: string
}
