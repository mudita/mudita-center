/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum OutlookFreq {
  daily = "daily",
  weekly = "weekly",
  absoluteMonthly = "absoluteMonthly",
  relativeMonthly = "relativeMonthly",
  absoluteYearly = "absoluteYearly",
  relativeYearly = "relativeYearly",
}

export enum Days {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

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
  Calendars = "calendars",
}

export interface OutlookProviderState {
  [OutLookScope.Contacts]: TokenPayload
  [OutLookScope.Calendars]: TokenPayload
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
  givenName?: string | null
  surname?: string | null
  mobilePhone?: string | null
  homePhones?: string[]
  businessPhones?: string[]
  homeAddress?: OutlookContactAddress
  businessAddress?: OutlookContactAddress
  otherAddress?: OutlookContactAddress
  emailAddresses?: OutlookEmailAddress[]
  personalNotes?: string | null
}

export interface OutlookCalendar {
  id: string
  name: string
  isDefaultCalendar: boolean
  color: string
  hexColor: string
  changeKey: string
  canShare: boolean
  canViewPrivateItems: boolean
  canEdit: boolean
  allowedOnlineMeetingProviders: string[]
  defaultOnlineMeetingProvider: string
  isTallyingResponses: boolean
  isRemovable: boolean
  owner: {
    name: string
    address: string
  }
}

export interface OutlookEvent {
  id: string
  subject: string
  start: { dateTime: string; timeZone: string }
  end: { dateTime: string; timeZone: string }
  isAllDay: boolean
  recurrence?: {
    pattern: {
      type: string
      interval: number
      month: number
      dayOfMonth: number
      daysOfWeek: string[]
      firstDayOfWeek: string
      index: string
    }
    range: {
      type: string
      startDate: string
      endDate: string
      recurrenceTimeZone: string
      numberOfOccurrences: number
    }
  }
}
